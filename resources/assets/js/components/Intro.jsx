import React, { Component } from 'react';
import * as common from '../actions/common.jsx';
import Score from './ResultsTable';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        //introFormValid: state.introFormValid,
        validUsername: state.validUsername,
        validCaptcha: state.validCaptcha,
        startAppButtonPressed: state.startAppButtonPressed
    }
}

@connect(mapStateToProps)
export default class Intro extends Component {

    constructor(props) {
        super(props);
        // I have to do this, so the methods will be accessible in the render method ..
        this.onNameChange = this.onNameChange.bind(this);
        this.renderValidUsernameErrorClass = this.renderValidUsernameErrorClass.bind(this);
        this.renderValidCaptchaErrorClass = this.renderValidCaptchaErrorClass.bind(this);
        userName: '';
    }

    onNameChange(e) {
        common.setUsername(e.target.value);
    }

    onCaptchaChange(e) {
        common.setCaptcha(e.target.value);
    }

    renderValidUsernameErrorClass() {
        return (!(this.props.validUsername) && this.props.startAppButtonPressed) ? 'form-group has-error' : 'form-group';
    }

    renderValidCaptchaErrorClass() {
        return (!(this.props.validCaptcha) && this.props.startAppButtonPressed) ? 'form-group has-error' : 'form-group';
    }

    render() {

        return (

            <section className="content" style={{minHeight: "1000px"}}>

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">

                        <div className="box box-info">
                            <div className="box-header with-border">
                                <h3 className="box-title">Game parameters ...</h3>
                            </div>
                            <div className="form-horizontal">
                                <div className="box-body">
                                    <div className={this.renderValidUsernameErrorClass()}>
                                        <label htmlFor="name" className="col-sm-3 control-label">Your name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="name" placeholder="Enter your name" autoComplete="off" onChange={this.onNameChange} />
                                        </div>
                                    </div>
                                    <div className={this.renderValidCaptchaErrorClass()}>
                                        <label htmlFor="captcha" className="col-sm-3 control-label">Captcha</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="captcha" placeholder="What is the capital of Slovakia?" autoComplete="off" onChange={this.onCaptchaChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button className="btn btn-primary pull-right" onClick={() => common.startApplicationAndLoadQuestion(this.userName)}>Start the quiz</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <Score />
                    </div>
                </div>

            </section>

        );

    }

}