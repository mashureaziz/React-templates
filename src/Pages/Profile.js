import React , {useEffect, useState,useContext, Fragment} from "react";
import { useHistory } from "react-router";
import ContentWrapper from "../Components/Content/ContentWrapper";
import useRequest from "../hooks/useRequest";
import AuthContext from "../store/AuthContext";
import LoadingModal from "../Components/UI/LoadingModal";
import { Spinner } from "react-bootstrap";

const Profile = (props) => {
    const history = useHistory();
    const authStore = useContext(AuthContext);
    const [data , setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {error, doRequest} = useRequest({
        url : 'http://localhost:4000/dashboard',
        method: 'GET',
        onSuccess : (data) => {
            setIsLoading(false);
            setData(data.message);
        }
    })

    useEffect(()=> {
        doRequest().then();
    },[]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(isLoading) {
                setData('Network Error');
                setIsLoading(false);
            }
        }, 8000);
        return () => {clearInterval(timer)}
    },[isLoading])

     return(
         <Fragment>
             <ContentWrapper>
                {isLoading && 
                (<LoadingModal>
                <Spinner animation="border" variant="primary" />
                </LoadingModal>)
                }
                {data}
             </ContentWrapper>)
         </Fragment>
        
    )
}

export default Profile;