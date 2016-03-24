import * as helpers from '../helpers/animations.js';

export default function reducer(state, action) {

    switch(action.type) {
        case 'ANSWER_SELECTED':
            return Object.assign({}, state, {
                suppliedAnswer:action.suppliedAnswer
            })
        case 'START_APPLICATION':
            return Object.assign({}, state, {
                applicationStarted: true
            })
        case 'LOAD_COUNTRIES':
            return Object.assign({}, state, {
                country: action.country,
                options: action.options
            })
        case 'INIT_COUNTRIES':
            return Object.assign({}, state, {
                allCountries: action.allCountries
            })
        case 'LOAD_NEW_QUESTION':
            return Object.assign({}, state, {
                country: action.countryName,
                correctAnswer: action.correctAnswer,
                options: action.options,
                currentQuestionCount: action.currentQuestionCount,
                latlng: action.latlng
            })
        case 'ANSWER_CORRECT':
            helpers.animate('.correct');
            return Object.assign({}, state, {
                correctAnswerCount:state.correctAnswerCount+1
            })
        case 'ANSWER_INCORRECT':
            helpers.animate('.incorrect');
            return Object.assign({}, state, {
                incorrectAnswerCount:state.incorrectAnswerCount+1
    })
        default:

            // This is how the initial state looks like ..
            return {
                // Indicate how many answer are we going to answer during the quiz ..
                allQuestionsCount: 3,

                // Indicate the current question
                currentQuestionCount: 0,

                // Indicates, whether the game has been started already ..
                applicationStarted: false,

                // Here I will store all available countries ..
                allCountries: {},

                // Name of the country we want to guess the capital
                country: '',

                // Here we will store the name of the city as a string ..
                correctAnswer: '',

                // Here we will store the coordinates of the capital, so we can display it on the map ..
                latlng: [],

                suppliedAnswer: '',

                // Possible answers (correct option excluded) ..
                options: [],

                correctAnswerCount: 0,

                incorrectAnswerCount: 0
            }
    }

}
