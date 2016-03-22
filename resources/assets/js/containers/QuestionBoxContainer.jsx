// TODO Rewrite this to different type of module .. Use class as in all other cases ..

import { connect } from 'react-redux';
import * as common from '../actions/common.jsx';
import QuestionBox from '../components/QuestionBox.jsx';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
    return {
        countryName: state.country,
        allCountries: state.allCountries,
        options: state.options,
        state: state,
        correctAnswerCount:state.correctAnswerCount,
        incorrectAnswerCount:state.incorrectAnswerCount
    }
}

const QuestionBoxContainer = connect(
    mapStateToProps
)(QuestionBox)

export default QuestionBoxContainer