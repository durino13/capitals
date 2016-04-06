import React, { Component } from 'react';
import { connect } from 'react-redux';
import knob from 'jquery-knob';
import * as common from '../actions/common.jsx';

// Access the state variable from the Provider component ...
const mapStateToProps = (state) => {
    return {
        bonusPoints: state.bonusPoints,
        currentQuestionCount: state.currentQuestionCount,
        allQuestionsCount: state.allQuestionsCount
    }
}

@connect(mapStateToProps)
export default class Timer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        $(".bonus").knob({
            max:1000,
            min:0,
            readOnly: true,
            width: 70,
            height: 70,
            fgColor: '#00C0EF',
            bgColor: '#659FB9',
            thickness: 0.06
        });

        // Set the initial value and decrease bonus by 10 every 3s
        $('.bonus').val(1000);
        this.interval = setInterval(function() {
            common.decreaseBonus(10)
        }, 3000)
    }

    componentDidUpdate() {

        if ((this.props.bonusPoints <= 0) || (this.props.allQuestionsCount === this.props.currentQuestionCount)) {
            clearInterval(this.interval);
        } else {
            $('.bonus').val(this.props.bonusPoints);
        }
    }

    render() {

        return (
            <div>
                <input type="text" className="bonus" />
            </div>
        );

    }

}