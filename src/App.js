import React, {Fragment, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import {Provider} from 'react-redux';
import store from './redux/store';
import Alert from "./components/alert";
import setAuthToken from "./utils/set-auth-token";
import {loadUserAction} from "./redux/action/auth-action";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/private-route";
import UpsertProfile from "./components/profile/upsert-profile";
import AllProfiles from "./components/profile/all-profiles";
import Profile from "./components/profile/profile";
import AllPosts from "./components/post/all-posts";
import Post from "./components/post/post";
import ScrollToTop from "./utils/scroll-to-top";

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
                <ScrollToTop>
                    <Fragment>
                        <Navbar/>
                        <Route exact path='/' component={Landing}/>
                        <section className='container'>
                            <Alert/>
                            <Switch>
                                <Route exact path='/register' component={Register}/>
                                <Route exact path='/login' component={Login}/>
                                <Route exact path='/allprofiles' component={AllProfiles}/>
                                <Route exact path='/profile' component={Profile}/>
                                <Route exact path='/allposts' component={AllPosts}/>
                                <Route exact path='/post' component={Post}/>
                                <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                                <PrivateRoute exact path='/upsert-profile' component={UpsertProfile}/>
                            </Switch>
                        </section>
                    </Fragment>
                </ScrollToTop>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
