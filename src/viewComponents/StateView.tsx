import { memo } from "react";
import { Position, Size } from "../gamelogic/common"

function StateView({score,highScore, snakeLength, snakePosition, boardSize}:
    {score: number,highScore: number, snakeLength: number, snakePosition:Position, boardSize:Size}){
    
    const rightColStyle: React.CSSProperties ={
        textAlign:"right",
        paddingLeft: "0px",
        paddingRight: "4px",
    }; 

    const stateViewStyle: React.CSSProperties ={
        paddingTop: "6px",
        paddingLeft: "4px",
        display: "grid",
        gridTemplateColumns: "70% 30%",
        textAlign:"left"
    };

    return (
        <div className="stateView" style={stateViewStyle}>
            <div className="boardSize">Board size :</div><div style={rightColStyle}>{boardSize.Width} x {boardSize.Height} </div>
            <div>------------------------------</div><div>------------</div>
            <div className="score">Score :</div><div style={rightColStyle}>{score}</div>
            <div className="highScore">HighScore :</div><div style={rightColStyle}>{highScore}</div>
            <div className="snakeLength">Snake Length :</div><div style={rightColStyle}>{snakeLength}</div>
            <div className="snakePosition">Snake Position :</div><div style={rightColStyle}>{snakePosition.X} , {snakePosition.Y}</div>
        </div>
    )
}
export default memo(StateView);