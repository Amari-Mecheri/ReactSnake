import { memo } from "react"

function TitleView() {   
    const style ={
        textAlign: "center",
        textShadow: "1px 1px 2px black, 0 0 25px pink, 0 0 5px purple",
        animationName: "title",
        animationDuration: "3s",
    } as React.CSSProperties
    return (
        <div className="TitleView"><p style={style}>React Snake</p></div>
    )    
}

export default memo(TitleView)