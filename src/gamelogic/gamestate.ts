import { Errors, Direction, Size, Sprite, Position } from "./common"
import gameBoard from "./gameboard"

const goLeft: Direction = {DX: -1,	DY: 0}
const goRight: Direction = {DX: 1,DY: 0}
const goUp: Direction = {DX: 0,	DY: -1}
const goDown: Direction = {DX: 0,DY: 1}

export class gameState extends gameBoard {
	private gameInProgress: boolean = false
	private round:          number = 0
	private score:          number = 0
	private highScore:      number = 0
	private dirty:          boolean = false
    
    InitBoard(size: Size) : Errors {

        let err = this.InitGameBoard(size)
        if(err != null) return err

        this.dirty = false
        return null
    }

    CreateObjects(): [listSprite: Sprite[], err: Errors] {	

        let position = new Position(this.BoardSize().Width / 2,this.BoardSize().Height / 2)
        
        let [snake, err] = this.CreateSnake(position, goRight)
        if (err != null) return [null, err]

        let candy: Sprite
        [candy, err] = this.CreateCandy()
        return [[snake, candy], err]
    }

    Start() {
        this.gameInProgress = true
        this.score = 0
        this.round = 0
        this.dirty = true
    }

    Play(): [listSprite: Sprite[], err: Errors] {

        //Plays a round
        this.round++

        //Move the snake
        let [oldValue, spriteList, err] = this.MoveSnake()
        if (err != null) {
            this.gameInProgress = false
            return [null, err]
        }
        //Game over?
        if (this.IsSnakePart(oldValue)) {
            this.gameInProgress = false
            return [spriteList, null]
        }

        //Ate a candy?
        if(this.IsCandy(oldValue)) {
            //Remove the candy since it's been eaten
            this.RemoveCandy()
            //updates the score
            this.score++
            //updates the highscore
            if (this.score > this.highScore) {
                this.highScore = this.score
            }
        }

        //No more candies?
        if (!this.CandyAlive()) {
            let sprite:Sprite
            [sprite, err] = this.CreateCandy()
            if( err != null) {
                return [null, err]
            }
            spriteList.push(sprite)
        }

        return [spriteList, null]
    }

    GameInProgress(): boolean {
        return this.gameInProgress
    }

    SetGameInProgress(val: boolean) {
        this.gameInProgress = val
    }

    Dirty(): boolean {
        return this.dirty
    }

    HighScore(): number {
        return this.highScore
    }

    Score(): number {
        return this.score
    }

    Round(): number {
        return this.round
    }

    MoveLeft() {
        this.SetSnakeDirection(goLeft)
    }
    MoveRight() {
        this.SetSnakeDirection(goRight)
    }
    MoveDown() {
        this.SetSnakeDirection(goDown)
    }
    MoveUp() {
        this.SetSnakeDirection(goUp)
    }
}