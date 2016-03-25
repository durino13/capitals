import React, { Component } from 'react';
import * as common from '../actions/common.jsx';

export default class Intro extends Component {

    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        userName: '';
    }

    onNameChange(e) {
        this.userName = e.target.value;
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
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-sm-3 control-label">Your name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="name" placeholder="Enter your name" autoComplete="off" onChange={this.onNameChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="captcha" className="col-sm-3 control-label">Captcha</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="captcha" placeholder="What is the capital of Slovakia?" autoComplete="off" />
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

            </section>

        );

    }

}