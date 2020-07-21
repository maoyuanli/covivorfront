import React, {Fragment, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Register from "./components/register";
import Login from "./components/login";
import {Provider} from 'react-redux';
import store from './redux/store';
import Alert from "./components/alert";
import setAuthToken from "./utils/set-auth-token";
import {loadUserAction} from "./redux/action/auth-action";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/private-route";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

export const App = () => {
    useEffect(() => {
        store.dispatch(loadUserAction());
    }, [])
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <section className='container'>
                        <Alert/>
                        <Switch>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                        </Switch>
                    </section>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
