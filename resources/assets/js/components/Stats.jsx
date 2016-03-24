import React, { Component } from 'react';
import { connect } from 'react-redux';
import animateCss from 'animate.css-js';

export default class Start extends Component {

    constructor(props) {

        super(props);

        if (props.className === 'correct') {
            this.params = {
                title: 'Correct answers',
                handIconClass: 'fa fa-thumbs-o-up',
                backgroundClass: 'info-box bg-green',
                animationClass: 'correct'
            }
        } else {
            this.params = {
                title: 'Incorrect answers',
                handIconClass: 'fa fa-thumbs-o-down',
                backgroundClass: 'info-box bg-red',
                animationClass: 'incorrect'
            }
        }

    }

    render() {

        let classNames = this.params.backgroundClass+' '+this.params.animationClass;

        return (
            <div className={classNames}>
                <span className="info-box-icon"><i className={this.params.handIconClass}></i></span>
                <div className="info-box-content">
                    <span className="info-box-text">{this.params.title}</span>
                    <span className="info-box-number">{this.props.answerCount}</span>

                    <div className="progress">
                        <div className="progress-bar" style={{width: '70%'}}></div>
                    </div>
                </div>
            </div>
        );

    }

}