import * as helpers from '../helpers/animations.js';

export default function reducer(state, action) {

    // TODO Sometimes, I use action params, sometimes, I set the new state directly using primitive types .. Consolidate it ..
    switch(action.type) {
        case 'ANSWER_SELECTED':
            return Object.assign({}, state, {
                suppliedAnswer:action.suppliedAnswer
            })
        case 'START_APPLICATION':
            return Object.assign({}, state, {
                applicationStarted: true,
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
                correctAnswerCount:state.correctAnswerCount + 1
            })
        case 'ANSWER_INCORRECT':
            helpers.animate('.incorrect');
            return Object.assign({}, state, {
                incorrectAnswerCount:state.incorrectAnswerCount + 1,
                bonusPoints:state.bonusPoints - 100
            })
        case 'DECREASE_BONUS':
            return Object.assign({}, state, {
                bonusPoints: state.bonusPoints - action.decreaseStep
            })
        case 'GAME_OVER':
            return Object.assign({}, state, {
                gameOver: true
            })
        case 'RESULTS_LOADED':
            return Object.assign({}, state, {
                resultsLoaded: true,
                results: action.results
            })
        case 'INTRO_FORM_VALID':
            return Object.assign({}, state, {
                introFormValid: true,
                startAppButtonPressed: true
            })
        case 'INTRO_FORM_NOT_VALID':
            return Object.assign({}, state, {
                introFormValid: false,
                startAppButtonPressed: true
            })
        case 'RESET_STATE':
            return Object.assign({}, state, {
                applicationStarted: action.applicationStarted,
                bonusPoints: action.bonusPoints,
                correctAnswerCount: action.correctAnswerCount,
                currentQuestionCount: action.currentQuestionCount,
                gameOver: action.gameOver,
                incorrectAnswerCount: action.incorrectAnswerCount,
                introFormValid: action.introFormValid,
                resultsLoaded: action.resultsLoaded,
                startAppButtonPressed: action.startAppButtonPressed
            })
        case 'SET_USERNAME':
            return Object.assign({}, state, {
                userName: action.userName
            })
        case 'DEFAULT':
        default:

            // This is how the initial state looks like ..
            return {

                /*
                 * Global application state ..
                 */

                // Username
                userName: '',

                // Bonus points
                bonusPoints: 1000,

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

                incorrectAnswerCount: 0,

                gameOver: false,

                /*
                 * Scoreboard results
                 */

                resultsLoaded: false,

                results: [],

                /*
                 * Intro form validation
                 */

                introFormValid: false,

                startAppButtonPressed: false
            }
    }

}
