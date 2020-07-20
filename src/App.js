import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Register from "./components/register";
import Login from "./components/login";

export const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Navbar/>
                <Route exact path='/' component={Landing}/>
                <section className='container'>
                    <Switch>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                    </Switch>
                </section>
            </Fragment>
        </BrowserRouter>

    );
}

export default App;
