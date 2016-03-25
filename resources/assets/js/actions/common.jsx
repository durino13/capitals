import store from '../index.jsx';
import fetch from 'isomorphic-fetch'

export function startApplication(userName) {
    return {
        type: 'START_APPLICATION',
        userName: userName
    }
}

export function decreaseBonusPoints(decreaseStep) {
    return {
        type: 'DECREASE_BONUS',
        decreaseStep: decreaseStep
    }
}

export function selectAnswer(answer) {

    // Dispatch the answer ..
    store.dispatch({
        type: 'ANSWER_SELECTED',
        suppliedAnswer: answer
    })

    // Evaluate answer ..
    evaluateAnswer();

    // Load next question ..
    setTimeout(function(){
        loadNewQuestion();
        }, 500);
}

export function loadNewQuestionAction(country, randomOptions, currentQuestionCount) {

    return {
        type: 'LOAD_NEW_QUESTION',
        countryName: country.countryName,
        correctAnswer: country.option,
        latlng: country.latlng,
        options: shuffle(randomOptions.concat(country)),
        currentQuestionCount: currentQuestionCount + 1
    }
}

function evaluateAnswer() {
    let state = store.getState();

    if (state.suppliedAnswer === state.correctAnswer) {
        store.dispatch({
            type: 'ANSWER_CORRECT'
        })
    } else {
        store.dispatch({
            type: 'ANSWER_INCORRECT'
        })
    }
}

export function loadNewQuestion() {

    let state = store.getState();
    let allCountries = state.allCountries;
    let currentQuestionCount = state.currentQuestionCount;

    let country = getRandomCountry(allCountries);
    let randomOptions = getRandomOptions(allCountries);

    store.dispatch(loadNewQuestionAction(country, randomOptions, currentQuestionCount));
}

/*
 * Function loads all countries from the local json object into the store
 */

export function loadAllCountries () {

    return (dispatch) => {
        fetch('assets/countries.json')
            .then(response => response.json())
            .then(json => {
                    let myObject = [];
                    json.map(function(value, index) {
                        myObject[index] = {
                            countryName: value.name,
                            option: value.capital,
                            latlng: value.latlng
                        };
                    })
                    return myObject;
                }
            ).then(allCountries => {
                dispatch(init(allCountries));
            }
        );
    }
};

function init(allCountries) {
    return {
        type: 'INIT_COUNTRIES',
        allCountries: allCountries
    }
}

export function startApplicationAndLoadQuestion(userName) {
    let state = store.getState();
    let allCountries = state.allCountries;
    store.dispatch(startApplication(userName));
    loadNewQuestion(allCountries);
}

export function decreaseBonus(decreaseStep) {
    store.dispatch(decreaseBonusPoints(decreaseStep));
}

// TODO I want to access allCountries directly here, I don't want to pass them from the component ..
function getRandomOptions() {

    // Here I will choose 5 random countries as answer options ..
    let countries = [];
    let i = 0;

    let state = store.getState();
    let allCountries = state.allCountries;

    // let's load 5 possible answers
    do {
        let country = getRandomCountry(allCountries);
        if (country.option !== '') {
            countries.push(({countryName: country.countryName,option: country.option, correct:'no'}))
            i+=1;
        }
    } while (i < 3)

    return countries;

}

function getRandomCountry(allCountries) {
    var randomKey = Math.floor(Math.random()*allCountries.length)+1;
    // Return random country from the list of all countries ..
    return allCountries[randomKey];
}

// TODO move function to an external library ..
function shuffle (array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array;
}