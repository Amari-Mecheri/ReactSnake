import { memo } from "react"

function HelpView(){
    return (
        <div className="HelpView">
            <div>The Snake Game</div>
            <div>GRAB the CANDIES</div>
            <br></br>
            <div>Select board size</div>
            <div>with ENTER</div>
            <br></br>
            <div>SPACEBAR to start</div>
            <br></br>
            <div>Keys: BOTTOM, UP</div>
            <div>LEFT, RIGHT</div>
        </div>
    )
}

export default memo(HelpView)