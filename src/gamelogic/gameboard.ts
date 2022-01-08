import { Errors, Size, Position, Direction, Sprite } from "./common";
import candy from "./candy";
import snake from "./snake";

export const FreeSpace = ' '.charCodeAt(0);
export const SnakePart = 'S'.charCodeAt(0);
export const CandyBody = '*'.charCodeAt(0);

const ErrInvalidSnakeReference = new Errors("the snake object is null")
const ErrInvalidSize           = new Errors("invalid board size")
const ErrInvalidPosition       = new Errors("invalid position")

// gameBoard defines the properties of a game board
class gameBoard {
	private size: 		 Size = new Size(0,0)
	private board:       number[][]
	private movingSnake: snake
	private candy:       candy

	InitGameBoard(size: Size) {

		const err = this.createBoard(size)
		if(err != null ) return err

		return this.clearBoard()
	}

	createBoard(size: Size){

		// creates a slice of slices (2d slice)
		if (size.Width < 0 || size.Height < 0) {
			return ErrInvalidSize
		}
		
		this.board= new Array(size.Height)
		for(let y=0; y<size.Height;y++)	this.board[y] = new Array(size.Width);

		this.size = size
		return null
	}

	clearBoard(): Errors {
		// fills the gameBoard with FreeSpaces
		for(let x=0; x<this.board.length;x++){
			for(let y=0; y<this.board[x].length;y++){
				this.board[x][y] = FreeSpace
			}
		}
		return null
	}

	BoardSize() {
		return this.size
	}

	IsSnakePart(ch: number)  {
		return ch === SnakePart
	}

	IsCandy(ch: number) {
		return ch === CandyBody
	}

	CreateSnake(position: Position, direction: Direction):[Sprite, Errors] {

		// Creates and position the snake
		this.movingSnake = new snake()
		this.movingSnake.SetDirection(direction)
		let err = this.movingSnake.GrowTo(position)
		if(err != null) return [null, err]

		// Writes the snake to the board
		err = this.setCell(position, SnakePart)
		if(err != null ) return [null, err]

		return [new Sprite(SnakePart, position), null]
	}

	SnakePosition() {

		return this.movingSnake.Position()
	}

	CandyPosition() {
		return this.candy.Position()
	}

	CandyAlive() {
		return this.candy.Alive()
	}

	RemoveCandy() {
		this.candy.Remove()
	}

	CreateCandy(): [Sprite, Errors] {

		// Gets a free position
		let [position, err] = this.RandomFreePosition()
		if (err != null) {
			return [null, err]
		}

		// Creates a candy
		this.candy = new candy()
		this.candy.Init(position)

		// Sets the candy on the board
		err = this.setCell(position, CandyBody)
		if (err != null) {
			return [null, err]
		}
		return [new Sprite(CandyBody,position),null]
	}

	RandomFreePosition():[Position, Errors] {
		if (this.size.Width <= 0 || this.size.Height <= 0) {
			return [null, ErrInvalidSize]
		}

		// Randomly defines the candy position
		const maxW = this.size.Width
		const maxH = this.size.Height

		let rndX = Math.floor(Math.random() * maxW)
		let rndY = Math.floor(Math.random() * maxH)

		// loops for a free spot
		let [val, err] = this.cell(new Position(rndX,rndY))
		if (err != null) return [null, err]

		while(val !== FreeSpace) {
			rndX = Math.floor(Math.random() * maxW);
			rndY = Math.floor(Math.random() * maxH);

			[val, err] = this.cell(new Position(rndX,rndY))
			if (err != null) break
		}

		return [new Position(rndX,rndY), err]
	}

	SetSnakeDirection(direction: Direction) {
		this.movingSnake.SetDirection(direction)
	}

	SnakeSize(): [number, Errors] {

		if(this.movingSnake == null) {
			return [0, ErrInvalidSnakeReference]
		}

		return this.movingSnake.Size()
	}

	MoveSnake(): [oldValue: number, listSprite: Sprite[], err: Errors] {
		// Asks the snake where it wants to move
		let [requestedPosition, err] = this.movingSnake.NextMove()
		if (err != null) return [0, null, err]

		// Translates the requested position inside the board
		let actualPosition: Position
		[actualPosition, err] = this.translatePosition(requestedPosition)
		if( err != null) return [0, null, err]

		// Gets the content at the actual position
		let oldValue: number
		[oldValue, err] = this.getOldValue(actualPosition)
		if( err != null) return [oldValue, null, err]

		// Call the actual move (or growth)
		let listSprite: Sprite[]
		[listSprite, err] = this.actualMove(actualPosition, oldValue)
		
		// returns the old content and the list of sprites
		return [oldValue, listSprite, err]
	}

	getOldValue(position: Position) : [number, Errors] {	
		// Gets the value at the position but checks the tail position
		let [tailPosition, err] = this.movingSnake.Tail()
		if( err != null) return [0, err]

		let oldValue: number
		[oldValue, err] = this.cell(position)
		if( err != null) return [0, err]

		// Checks if the oldValue is the tail and returns a freeSpace instead	
		if(JSON.stringify (tailPosition) === JSON.stringify (position))
			return [FreeSpace, null]

		return [oldValue, err]
	}

	actualMove(position: Position, oldValue: number):[listSprite: Sprite[], err: Errors] {

		// has the snake eaten a candy?
		if (oldValue === CandyBody) {
			// Grow the snake
			let err = this.movingSnake.GrowTo(position)
			if( err != null) return [null, err]

			// update the board
			err = this.setCell(position, SnakePart)
			// Only the head of the snake is updated
			return [[{Value: SnakePart,Position: position}], err]
		}

		// Move the snake
		let [oldTail, err] = this.movingSnake.MoveTo(position)
		if (err != null) return [null, err]

		// update the board with the new head
		err = this.setCell(position, SnakePart)
		if (err != null) return [null, err]

		// Remove the tail
		err = this.setCell(oldTail, FreeSpace)
		// The tail and the head have been updated
		return [[{Value: FreeSpace,Position: oldTail},
			{Value: SnakePart,Position: position}], err]
	}

	cell(position: Position): [number, Errors] {

		if (this.size.Width <= 0 || this.size.Height <= 0) return [0, ErrInvalidSize]

		if (!this.checkPosition(position)) return [0, ErrInvalidPosition]

		return [this.board[position.X][position.Y], null]
	}

	setCell(position: Position, value: number): Errors{

		if (this.size.Width <= 0 || this.size.Height <= 0) return ErrInvalidSize
		
		if (!this.checkPosition(position)) return ErrInvalidPosition

		this.board[position.X][position.Y] = value

		return null
	}

	checkPosition(position: Position): boolean {

		if (position.X < 0 || position.X >= this.size.Width) return false
		
		if (position.Y < 0 || position.Y >= this.size.Height) return false
		
		return true
	}

	translatePosition(requestedPosition: Position): [Position, Errors] {
		// The position is kept inside the board
		// If it gets out one side, it enters the other side

		if(this.size.Width <= 0 || this.size.Height <= 0) {
			return [null, ErrInvalidSize]
		}

		let translatedPosition = requestedPosition
		const maxW = this.size.Width - 1
		const maxH = this.size.Height - 1

		if (translatedPosition.X < 0) translatedPosition.X = maxW
		if (translatedPosition.X > maxW) translatedPosition.X = 0
		if (translatedPosition.Y < 0) translatedPosition.Y = maxH
		if (translatedPosition.Y > maxH) translatedPosition.Y = 0

		return [translatedPosition, null]
	}
}

export default gameBoard