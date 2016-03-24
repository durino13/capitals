import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorldMapContainer from '../containers/WorldMapContainer';
import * as actions from '../actions/common.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Stats from './Stats';

/*
 * The connect method injects the store and dispatch as new properties of this.props ..
 */
export default class QuestionBox extends Component {

    constructor(props) {
        super(props);
    }

    isAnswerSelected() {
        if (this.props.state.suppliedAnswer != '')
        {
            return '';
        } else {
            return 'disabled';
        }
    }

    render() {

        const { countryName, options, correctAnswerCount, incorrectAnswerCount, allQuestionsCount, currentQuestionCount } = this.props;

        return (

        <div className="row">
            <div className="col-md-5">
                <div className="col-md-12">

                    <div className="progress-group">
                        <span className="progress-text">Questions</span>
                        <span className="progress-number"><b>{currentQuestionCount}</b>/{allQuestionsCount}</span>

                        <div className="progress sm">
                            <div className="progress-bar progress-bar-aqua" style={{width: (currentQuestionCount/allQuestionsCount)*100+'%'}}></div>
                        </div>
                    </div>

                    <div className="box">
                        <div className="box-header with-border">
                            <h3 className="box-title">Quiz questions</h3>
                        </div>
                        <div className="box-body">
                            <div className="callout callout-info">
                                <p>What is the capital city of <strong>{countryName}</strong></p>
                            </div>
                            <div>{options.map(function(option, i) {
                                return (
                                    <div key={i}>
                                        <div className="col-md-6" style={{padding:'10px'}}>
                                            <button key={i} className="btn btn-primary btn-block" onClick={actions.selectAnswer.bind(this, option.option)}>{option.option}</button>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="box">
                        <div className="box-header with-border">
                            <h3 className="box-title">Answer statistics</h3>
                        </div>
                        <div className="box-body">

                            <div className="row">
                                <div className="col-md-6">
                                    <Stats className="correct" answerCount={correctAnswerCount} />
                                </div>
                                <div className="col-md-6">
                                    <Stats className="incorrect" answerCount={incorrectAnswerCount} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <WorldMapContainer />
            </div>
        </div>

        );
    }

}