import React from 'react';
import { useReducer } from 'react';

const RequestContext = React.createContext({
    upDateStatus : () => {}
});

const RequestContextProvider = (props) => {

    const statusReducer = (state, action) => {
        return {type : action.type , message : action.message}
    }

    const [status, statusDispatch] = useReducer(statusReducer, {
            type : '',
            messsage : ''
    } );


    const contextValue = {
        status,
        upDateStatus : statusDispatch
    }

    return(
    <RequestContext.Provider value = {contextValue}>
        {props.children}
    </RequestContext.Provider>
    )
}

export default RequestContext;
export {RequestContextProvider};
