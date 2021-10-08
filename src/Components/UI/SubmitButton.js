import React from "react";

const SubmitButton = props => {
    const {value, id} = props;

    return (
        <div className="form-control">
             <input id= {id} value= {value} type ="submit"></input>
        </div>
    )
}

export default SubmitButton;