import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

//import App from './containers/App'
import reducers from './reducers'

// import Main from './pages/Main';
// import Login from './pages/Login';
// import LoginRequiredHandler from './routes/RouteHelpers';

import LoginOrRegisterPage from './pages/LoginOrRegisterPage';

let App = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});

function select(state) {
    return state;
}

App = connect(select)(App);


const Main = React.createClass({
    render() {
        return (
            <h1>Main</h1>
        );
    }
});

const Index = React.createClass({
    render() {
        return (<span>WTF?</span>)
    }
});


let store = createStore(reducers)

let rootElement = document.getElementById('content');

let isLogged = false;

function checkAuth(nextState, replaceState) {
    checkIsAuth(nextState, replaceState);
    checkNotAuth(nextState, replaceState);
}

function checkIsAuth(nextState, replaceState) {
    if (!store.getState().isAuthorized) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }
}

function checkNotAuth(nextState, replaceState) {
    if (store.getState().isAuthorized) {
        replaceState({ nextPathname: nextState.location.pathname }, '/main')
    }
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} >
                <IndexRoute component={Index} onEnter={checkAuth}/>
                <Route path="login" component={LoginOrRegisterPage} onEnter={checkNotAuth} />
                <Route path="main" component={Main} onEnter={checkIsAuth} />
            </Route>
        </Router>
    </Provider>,
    rootElement
)