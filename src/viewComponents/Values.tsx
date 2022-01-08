import { memo } from "react"
import { Position, Size } from "../gamelogic/common"

function Values({score,highScore, snakeLength, snakePosition, boardSize}:
    {score: number,highScore: number, snakeLength: number, snakePosition:Position, boardSize:Size}){
    const valuesHeadersStyle: React.CSSProperties ={
        textAlign:"right",
        paddingLeft: "0px",
        paddingRight: "4px",
        paddingTop: "6px",
        gridRow: 1,
        gridColumn: 2,
    }

    return (
        <div className="valuesView" style={valuesHeadersStyle}>
            <div>{boardSize.Width} x {boardSize.Height} </div>
            <div>------------</div>
            <div>{score}</div>
            <div>{highScore}</div>
            <div>{snakeLength}</div>
            <div>{snakePosition.X} , {snakePosition.Y}</div>
        </div>
    )
}

export default memo(Values)