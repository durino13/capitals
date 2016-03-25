import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorldMap from './WorldMap';
import * as actions from '../actions/common.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Stats from './Stats';
import QuizResults from './QuizResults.jsx';
import modal from 'bootstrap';
import Timer from './Timer.jsx';

/*
 * The connect method injects the store and dispatch as new properties of this.props ..
 */
const mapStateToProps = (state) => {
    return {
        countryName: state.country,
        allCountries: state.allCountries,
        options: state.options,
        correctAnswerCount: state.correctAnswerCount,
        incorrectAnswerCount: state.incorrectAnswerCount,
        allQuestionsCount: state.allQuestionsCount,
        currentQuestionCount: state.currentQuestionCount,
        bonusPoints: state.bonusPoints,
        gameOver: state.gameOver
    }
}

@connect(mapStateToProps)
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

    componentDidUpdate() {
        if (this.props.gameOver) {
            $('#quiz-results').modal('show');
        }
    }

    render() {

        const { countryName, options, correctAnswerCount, incorrectAnswerCount, allQuestionsCount, currentQuestionCount, bonusPoints } = this.props;

        return (

            <div className="row">
                <div className="col-md-5">
                    <div className="col-xs-12 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                        <Timer />
                    </div>
                    <div className="col-md-12">

                        <div className="progress-group">
                            <span className="progress-text">Questions</span>
                            <span
                                className="progress-number"><b>{currentQuestionCount}</b>/{allQuestionsCount}</span>

                            <div className="progress sm">
                                <div className="progress-bar progress-bar-aqua"
                                     style={{width: (currentQuestionCount/allQuestionsCount)*100+'%'}}></div>
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
                                <div>{options.map(function (option, i) {
                                    return (
                                        <div key={i}>
                                            <div className="col-md-6" style={{padding:'10px'}}>
                                                <button key={i} className="btn btn-primary btn-block"
                                                        onClick={actions.selectAnswer.bind(this, option.option)}>{option.option}</button>
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
                                        <Stats className="correct" answerCount={correctAnswerCount}/>
                                    </div>
                                    <div className="col-md-6">
                                        <Stats className="incorrect" answerCount={incorrectAnswerCount}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12" style={{padding: '5px 15px'}}>
                                        <span className="label label-success" style={{marginRight: '1em'}}>Score: </span> <span>{correctAnswerCount*100}</span>
                                    </div>
                                    <div className="col-md-12" style={{padding: '5px 15px'}}>
                                        <span className="label label-success" style={{marginRight: '1em'}}>Bonus points: </span> <span>{bonusPoints}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <WorldMap />
                </div>
                <QuizResults />
            </div>

        );
    }

}