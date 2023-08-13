import React from "react";

export default function Die(props){

    const changeStyle = {
        backgroundColor : props.held===true ? "#59E391" : "white" 
    }
    
    return(
        <div className="dice" onClick={props.click} style={changeStyle}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}