import React from 'react';
import { Provider } from 'react-redux';
import { Component } from 'react';
import App from '../components/App.jsx';

export default class Root extends Component {
    render() {
        const { store } = this.props
        return (
            <div>
                <Provider store={store}>
                    <App />
                </Provider>
            </div>
        );
    }
}

