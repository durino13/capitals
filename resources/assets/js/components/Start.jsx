import React, { Component } from 'react';
import * as common from '../actions/common.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import QuestionBoxContainer from '../containers/QuestionBoxContainer.jsx';
import QuestionBox from './QuestionBox.jsx';
import Intro from './Intro.jsx';

const mapStateToProps = (state) => {
    return {
        applicationStarted: state.applicationStarted,
        currentCount: state.currentQuestionCount,
        allQuestionsCount: state.allQuestionsCount
    }
}

@connect(mapStateToProps)
export default class Start extends Component {

    constructor(props) {
        super(props);
        // Here I will initialize all the countries ..
        this.props.dispatch(common.loadAllCountries());
    }

    render() {

        const { applicationStarted } = this.props;

        if (applicationStarted) {
            return (
                <QuestionBox />
            )
        } else {
            return (
                <Intro />
            );
        }

    }

}