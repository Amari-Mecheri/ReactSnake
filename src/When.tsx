import React from "react";

// When.jsx
function When({ children, condition }:{ children:any, condition:any }):any {
    const shouldRender = typeof condition === 'function'
        ? condition()
        : condition

    if(!shouldRender) return null

    return children
}

export default React.memo(When);