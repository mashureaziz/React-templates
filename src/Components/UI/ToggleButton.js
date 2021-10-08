import React from 'react';

const ToggleButton = (props) => {
    return(
        <div className="form-control">
    <button className = "toggleButton" onClick = {props.toggleAction}>{props.value}</button>
        </div>
    )
}

export default ToggleButton;