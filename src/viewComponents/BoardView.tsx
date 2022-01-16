import React from "react"
import { Size } from "../gamelogic/common"


// creates a grid of Width x Height divs
// each div has a size of 10px x 10px and an id equal to their position
function BoardView(size:Size){
    let {Width,Height} = size;
    const boardStyle: React.CSSProperties ={
        border: "yellow 2px solid",
        display: "grid",
        gridTemplateColumns: `repeat(${Width}, 10px)`,
        gridTemplateRows: `repeat(${Height}, 10px)`
    };

    return(
        <div className="boardview" style={boardStyle}>
            {
                range(0,Height-1).map((y: number) => {
                    return range(0,Width-1).map((x: number)=>{
                        const id = "spot"+x.toString().padStart(2,"0")+y.toString().padStart(2,"0")
                        const style ={
                            gridcolumn:`${x+1}`,
                            gridrow:`${y+1}`,
                        } as React.CSSProperties
                        return <div className="spot" id={id} style={style} key={id}></div>
                    })
                })
            }
        </div>
    )
}

function range(start: number, end : number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}

export default React.memo(BoardView);