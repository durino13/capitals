import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Root from './containers/Root.jsx';
import { createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'

// TODO This should be moved later in the store folder, I think ..
let store = createStore(
    reducer,
    'test',
    applyMiddleware(
        thunkMiddleware
    ));

render(
    <Root store={store} />,
    document.getElementById('quiz-component')
);

export default store;