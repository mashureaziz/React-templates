import React, { useState } from "react";
import Card from "../UI/Card";

const General = (props) => {
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        setClicked(true);
    }

    return(
        <Card>
            <div className = "toggle-button">
            {clicked && <div className = "clickText"> I have been clicked </div> }
            <button onClick = {handleClick}> Click Me </button>
        </div>
        </Card>
       
    )
}

export default General;

