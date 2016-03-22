import React from 'react';
import { connect } from 'react-redux';
import QuestionBoxContainer from '../containers/QuestionBoxContainer.jsx';
import Start from './Start.jsx';

/*
 * The connect method injects the store and dispatch as new properties of this.props ..
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Start />
        );
    }

}