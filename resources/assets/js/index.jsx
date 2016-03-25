import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Root from './components/Root.jsx';
import UserInfo from './components/UserInfo.jsx';
import { createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'

let store = createStore(
    reducer,
    'test',
    applyMiddleware(
        thunkMiddleware
    ));

// Render the quiz component
render(
    <Root store={store} />,
    document.getElementById('quiz-component')
);

// Render the current user
render(
    <UserInfo store={store} />,
    document.getElementById('user-info')
);

export default store;