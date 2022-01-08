import { memo, useEffect, useState } from "react"

function MessageView({message}:{message:string}){
    const [left, setLeft] = useState(200);
    const style ={
        position:"relative",
        left:left,
        top: 0,
        transition: "left 2s"
    } as React.CSSProperties

    useEffect(()=>{
        setLeft(60)
    },[]);

    return(
        <div className="messageView" style={style}>{message}</div>
    )
}

export default memo(MessageView);