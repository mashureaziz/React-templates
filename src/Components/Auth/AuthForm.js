import { React, useState, useContext, Fragment , useRef, useEffect} from 'react';
import { useHistory } from 'react-router';
import useRequest from '../../hooks/useRequest';

import Card from '../UI/Card';
import FormInput from '../UI/FormInput';
import SubmitButton from '../UI/SubmitButton';
import ToggleButton  from '../UI/ToggleButton';

import AuthContext from '../../store/AuthContext';

import {AuthInputAttr} from '../Auth/AuthInputAttr';

const AuthForm = (props) => {
    const [showLoginView , setShowLoginView] = useState(true);
    const [ name , setName] = useState('');
    const [ password, setPassword] = useState('');
    const authStore = useContext(AuthContext);
    const history = useHistory();

    const {error, doRequest} = useRequest({
        url :`http://localhost:4000/${showLoginView ? "login" : "register"}`,
        method : 'POST',
        body : {
            username : name,
            password : password
        },
        statusParams :{
            success : 'Success!',
            fail : 'Invalid Credentails'
        },
        onSuccess :(response) => {
            authStore.login(response.authToken);
            history.push('/profile');
        }
    })


    async function HandleSubmit(e) {
        e.preventDefault();
        await doRequest();
    }

    
    function HandleLoginToggle() {
        setShowLoginView((prev) => !prev)
    }
    function HandlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function HandleNameChange(e) {
        setName(e.target.value);
    }

    return(
        <Fragment>
        <Card>
        <form onSubmit = {HandleSubmit}>
            <FormInput  placeHolder = "Enter Username" inputAttr = {AuthInputAttr.username} value = {name} onChange = {HandleNameChange} />
            <FormInput  placeHolder = "Enter Password" inputAttr = { AuthInputAttr.password} value ={password} onChange = {HandlePasswordChange}/>
            {showLoginView && (
            <Fragment>
            <SubmitButton id = "login-submit" value = "login"/>
            <ToggleButton toggleAction = {HandleLoginToggle} value = "Don't have an account ?"/>
            </Fragment>
            )}
             {!showLoginView && (
            <Fragment>
            <SubmitButton id = "register-submit" value = "register"/>
            <ToggleButton  toggleAction = {HandleLoginToggle} value = "Already Have an account ?"/>
            </Fragment>
            )}
        </form>
        </Card>
        </Fragment>
    )
}

export default AuthForm;


