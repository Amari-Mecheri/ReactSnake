import { memo } from "react";

function Headers(){
    // const stateHeadersViewStyle: React.CSSProperties ={
    //     gridRow: 1,
    //     gridColumn: 1,
    //     paddingTop: "6px",
    //     paddingLeft: "4px",
    //     textAlign:"left"
    // };
    return (
    <div className="stateHeadersView">
        <div className="boardSize">Board size :</div>
        <div>------------------------------</div>
        <div className="score">Score :</div>
        <div className="highScore">HighScore :</div>
        <div className="snakeLength">Snake Length :</div>
        <div className="snakePosition">Snake Position :</div>
    </div>
    )
}

export default memo(Headers)