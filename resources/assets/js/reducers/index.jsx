// This is actually a store snapshot ..

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
                options: action.options
            })
        case 'ANSWER_CORRECT':
            return Object.assign({}, state, {
                correctAnswerCount:state.correctAnswerCount+1
            })
        case 'ANSWER_INCORRECT':
            return Object.assign({}, state, {
                incorrectAnswerCount:state.incorrectAnswerCount+1
    })
        default:

            // This is how the initial state looks like ..
            return {
                // Indicates, whether the game has been started already ..
                applicationStarted: false,

                // Here I will store all available countries ..
                allCountries: {},

                // Name of the country we want to guess the capital
                country: '',

                correctAnswer: '',

                suppliedAnswer: '',

                // Possible answers (correct option excluded) ..
                options: [],

                correctAnswerCount: 0,

                incorrectAnswerCount: 0
            }
    }

}
