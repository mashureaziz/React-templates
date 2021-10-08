import React from "react";

export const NotificationUI = (props)=> {
   
    const {statusClassName, statusMessage} = props;
    return(
        <div className = {'notification ' +statusClassName}>
            <div className = {`${statusClassName } notification-wrapper`}>
        {statusMessage}
            </div>
        </div>
    )
}

export default NotificationUI;