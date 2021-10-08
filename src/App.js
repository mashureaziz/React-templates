import './App.css';
import React ,{useContext, Fragment} from 'react';
import { AuthContextProvider } from './store/AuthContext';
import { RequestContextProvider } from './store/RequestContext';
import AuthContext from './store/AuthContext';

import AuthForm from './Components/Auth/AuthForm';
import Header from './Components/Header/Header';
import Notification from './Components/Notification/Notificication';
import MultiInput from './Pages/MultiInput/MultiInput';


import Profile from './Pages/Profile';
import LogOut from './Pages/LogOut';
import NotFound from './Pages/NotFound';

import {BrowserRouter, Route , Redirect, Switch} from 'react-router-dom';


function App() {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;
  return (
    <BrowserRouter>
    <RequestContextProvider>
      <div className="App">
        <Header/>
        <Switch>
        <Route path = "/" exact>
          <Redirect to = "/login"/>
        </Route>
        <Route path = "/input">
          <MultiInput/>
        </Route>
          <Route path = "/login">
            {
              !isLoggedIn && <AuthForm/>
            }
            {
              isLoggedIn && <Redirect to = "/profile"/>
            }
          </Route>

          <Route path = "/profile">
          {isLoggedIn && <Profile/>}
          {!isLoggedIn && <Redirect to = "/login"/>}
        </Route>
        <Route path = "/logout">
          { isLoggedIn && <LogOut/>}
          { !isLoggedIn && <Redirect to = "/login"/>}
        </Route>
        <Route path = "*">
          <NotFound/>
        </Route>
        </Switch>
        <Notification/>
      </div>
    </RequestContextProvider>
    </BrowserRouter>
  )
}

export default App;
