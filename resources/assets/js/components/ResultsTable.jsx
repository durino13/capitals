import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as db from '../helpers/database';
import lodash from 'lodash';
import * as common from '../actions/common.jsx';

// Access the state variable from the Provider component ...
const mapStateToProps = (state) => {
    return {
        resultsLoaded: state.resultsLoaded,
        results: state.results,
    }
}

@connect(mapStateToProps)
export default class ResultsTable extends Component {

    constructor(props) {
        super(props);
        db.getResults().done((res) => {
            common.loadResults(res);
        });
    }

    render() {

        if (this.props.resultsLoaded) {
            return (
                <div className="box">

                    <div className="box-header with-border">
                        <h3 className="box-title">Top 10 results</h3>
                    </div>

                    <div className="box-body">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <th style={{width: 10}}>#</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th style={{width: 40}}>Score</th>
                            </tr>

                            {
                                this.props.results.map(function(item, i) {
                                    return (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.created_at}</td>
                                            <td><span className="badge bg-light-blue">{item.score}</span></td>
                                        </tr>
                                    )
                                })
                            }

                            </tbody>
                        </table>
                    </div>

                </div>
            );
        } else {
            return (
                <div>Loading ...</div>
                )
        }


    }

}