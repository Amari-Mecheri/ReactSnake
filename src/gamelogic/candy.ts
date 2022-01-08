import { Position } from "./common";

class candy{
    private alive =false;
    private position = new Position(0,0)
     
    // Remove sets alive to false
   Remove() {
        this.alive = false
    }
    
    // Init set the position of the candy and alive to true
   Init(newPosition: Position) {
    this.position = newPosition
    this.alive = true
    }
    
    // Position returns the candy position
    Position() {
        return this.position
    }
    
    // Alive returns the candy status: eaten or not
    Alive() {
        return this.alive
    }
}

export default candy