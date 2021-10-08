import React , {useEffect , useContext} from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../store/AuthContext';

const LogOut = (props)=> {
const authStore = useContext(AuthContext);
const history = useHistory();

useEffect(() => {
    authStore.logout();
    history.push('/');
})
    return null;
}
export default LogOut;