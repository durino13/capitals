import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as db from '../helpers/database.js';

const mapStateToProps = (state) => {
    return {
        bonusPoints: state.bonusPoints,
        score: state.correctAnswerCount * 100,
        gameOver: state.gameOver
    }
}

@connect(mapStateToProps)
export default class QuizResults extends Component {

    constructor(props) {
        super(props);
    }

    sendResultsToServer() {
        db.sendResults('Juraj',300);
    }

    render() {

        // TODO This logic should not be here, it should be in the actions ..
        // Send the results to the server, if the game is completed .. ...
        if (this.props.gameOver) {
            this.sendResultsToServer();
        }

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
                                        <h4 className="modal-title">Scoreboard</h4>
                                    </div>
                                    <div className="modal-body">
                                        <p><b>Score:</b> {this.props.score}</p>
                                        <p><b>Bonus:</b> {this.props.bonusPoints}</p>
                                        <p><b>Total points earned:</b> {this.props.score + this.props.bonusPoints}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline" data-dismiss="modal">Replay</button>
                                        <button type="button" className="btn btn-outline" data-dismiss="modal">Quit</button>
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