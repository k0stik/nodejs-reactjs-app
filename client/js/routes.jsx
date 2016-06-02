import React from 'react'
import Router from 'react-router';
import Main from './pages/Main';
import Register from './pages/Register';
import Login from './pages/Login';
import LoginRequired from './util/RouteHelpers';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


module.exports = (
    <Route>
        <Route handler={Login} name="Login" path="Login"/>
        <Route handler={Register} name="Register" path="Register"/>
        <Route handler={LoginRequired}>
            <Route handler={Main} />
        </Route>
    </Route>
);