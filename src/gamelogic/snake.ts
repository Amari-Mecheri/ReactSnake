import { Errors, Position, Direction } from "./common"

// ErrNoSnakeBody is a custom error type
const ErrNoSnakeBody = new Errors("the snake has no body")

class snake {
    private body: Position[]
    private direction: Direction

    constructor(){
        this.body = new Array(0)
    }

    Size(): [number, Errors] {
        return [this.body.length, null]
    }

    SetDirection(direction: Direction) {
        this.direction = direction
    }

    Position(): [Position, Errors] {
        let [size, err] = this.Size()
        if(err!=null) return [null, err]

        if (size > 0) {
            // We need to create a position and not return the pointer to position at size-1
            return [new Position(this.body[size-1].X,this.body[size-1].Y), null]
        }

        return [null, ErrNoSnakeBody]
    }

    Tail(): [Position, Errors] {
        let [size, err] = this.Size()
        if(err!=null) return [null, err]

        if (size > 0) {
            // We need to create a position and not return the pointer to position at size-1
            return [new Position(this.body[0].X,this.body[0].Y), null]
        }

        return [null, ErrNoSnakeBody]
    }


    NextMove(): [Position,Errors] {
        const [nextPosition, err] = this.Position()
        if (err!=null) return [null, err]

        nextPosition.X += this.direction.DX
        nextPosition.Y += this.direction.DY
        return [nextPosition, null]
    }

    MoveTo(newPosition:Position): [Position, Errors] {
        let theTail: Position
        let [size, err] = this.Size()
        if (err!=null) return [null, err]

        if (size > 0) {
            // Removes the tail
            theTail = this.body.shift()
            // Inserts the head at new position
            this.body.push(newPosition)
            // return the tail
            return [theTail, null]
        }

        return [null, ErrNoSnakeBody]
    }

    GrowTo(newPosition: Position): Errors  {

        // Doesn't remove the tail
        // Inserts the head at new position
        this.body.push(newPosition)
        return null
    }
}

export default snake