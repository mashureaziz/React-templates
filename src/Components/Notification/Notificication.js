import React , {useContext, Fragment , useEffect} from "react";
import RequestContext from "../../store/RequestContext";
import NotificationUI  from "../UI/NotficationUI";

const Notification = (props)=> {
    
    const requestStore = useContext(RequestContext);
    const statusMessage = requestStore.status.message;
    const statusType = requestStore.status.type;


    useEffect(() => {
        if(statusMessage && statusType!== 'processing') {
            const interval = setTimeout(() => {
                requestStore.upDateStatus({type : "", message : "" });
            }, 2500)
            return () => {
                clearInterval(interval)}
        }
    }, [statusType,statusMessage,requestStore]);

    return (
        <Fragment>
            {statusMessage && <NotificationUI statusClassName = {statusType} statusMessage = {statusMessage}/>}
        </Fragment>
    )
}

export default Notification;