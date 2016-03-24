import React, { Component } from 'react';
//import { connect } from 'react-redux';

//const mapStateToProps = (state) => {
//    return {
//        correctAnswerCount: state.correctAnswerCount,
//    }
//}
//
//@connect(mapStateToProps)
export default class QuizResults extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <section className="content" style={{minHeight: "1000px"}}>

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">

                        <div id="quiz-results" className="modal modal-primary">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span></button>
                                        <h4 className="modal-title">Primary Modal</h4>
                                    </div>
                                    <div className="modal-body">
                                        <p>One fine body…</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        );

    }

}