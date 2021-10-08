import  {useContext , useState} from 'react';
import AuthContext from '../store/AuthContext';
import RequestContext from '../store/RequestContext';

const useRequest = ({url, method, body, statusParams, onSuccess}) => {

    const requestStore = useContext(RequestContext);
    const authStore = useContext(AuthContext);

    const [error, setError] = useState();

    const doRequest = async() => {
        try {
        if(statusParams) {
        requestStore.upDateStatus({type : "processing", message: "Sending" });
        }
        const response = await fetch(url, {
            method,
            body : JSON.stringify(body), 
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `${authStore.token ? "Bearer " + authStore.token : ""}`
            }
        });

        if(!response.ok) {
            console.log(response.status);
            if(response.status === 401) throw new Error("Unauthorized");
            throw new Error(await response.text());
        }

        const data = await response.json();
        if(statusParams) {
        requestStore.upDateStatus({type : "success", message: statusParams.success });
        }
        if(onSuccess) {
            onSuccess(data);
        }
    } catch(err) { 
        if(statusParams) {
        requestStore.upDateStatus({type : "error", message: err.message });
        } 
        setError(err.message);
    }
    }
    return {
        doRequest,
        error
    }
}
export default useRequest;