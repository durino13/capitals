import React, { Component } from 'react';
import * as common from '../actions/common.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuestionBoxContainer from '../containers/QuestionBoxContainer.jsx';

const mapStateToProps = (state) => {
    return {
        applicationStarted: state.applicationStarted,
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
                <QuestionBoxContainer />
            )
        } else {
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
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Enter your name" autoComplete="off" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button className="btn btn-primary pull-right" onClick={() => common.startApplicationAndLoadQuestion()}>Start the quiz</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>
            );
        }

    }

}