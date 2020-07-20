import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Register from "./components/register";
import Login from "./components/login";
import {Provider} from 'react-redux';
import store from './redux/store';
import Alert from "./components/alert";

export const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                        </Switch>
                    </section>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
