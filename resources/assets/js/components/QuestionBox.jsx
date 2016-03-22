import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/common.jsx';

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

        const { countryName, options, correctAnswerCount, incorrectAnswerCount } = this.props;

        let buttonStatus = this.isAnswerSelected();

        return (

            <div className="box">
                <div className="box-header with-border">
                    <h3 className="box-title">Monthly Recap Report</h3>
                </div>

                <div className="box-body">
                    <div className="row">
                        <div className="col-md-6">

                            <div className="callout callout-info">
                                <h4>I am a success callout!</h4>
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
                        <div className="col-md-3">
                            <div className="info-box bg-green">
                                <span className="info-box-icon"><i className="fa fa-thumbs-o-up"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Correct answers</span>
                                    <span className="info-box-number">{correctAnswerCount}</span>

                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '70%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ./box-body */}
                <div className="box-footer">
                    <div className="row">
                    </div>
                    {/* /.row */}
                </div>
                {/* /.box-footer */}
            </div>
        );
    }

}