import React, { Component } from 'react';
import { connect } from 'react-redux';


// TODO Nezobrazuje sa mi username ..


// Access the state variable from the Provider component ...
const mapStateToProps = (state) => {
    return {
        applicationStarted: state.applicationStarted,
        userName: state.userName
    }
}

@connect(mapStateToProps)
export default class UserInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { applicationStarted } = this.props;

        if (applicationStarted) {
            return (
                <li className="dropdown user user-menu">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <img src="assets/images/avatar.png" className="user-image" alt="User Image" />
                        <span className="hidden-xs">{this.props.userName}</span>
                    </a>
                </li>
            );
        } else {
            return (
                <div></div>
            )
        }


    }

}