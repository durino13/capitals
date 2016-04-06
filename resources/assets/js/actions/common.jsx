import store from '../index.jsx';
import fetch from 'isomorphic-fetch'
import * as db from '../helpers/database.js';
import * as debug from '../helpers/debug.js';

export function startApplication() {
    return {
        type: 'START_APPLICATION',
    }
}

export function decreaseBonusPoints(decreaseStep) {
    return {
        type: 'DECREASE_BONUS',
        decreaseStep: decreaseStep
    }
}

export function selectAnswer(answer) {

    let state = store.getState();

    // Dispatch the answer ..
    store.dispatch({
        type: 'ANSWER_SELECTED',
        suppliedAnswer: answer
    })

    // Evaluate answer ..
    evaluateAnswer();

    // Check, if the game is not yet over ..
    if (!isGameOver()) {
        // Load next question, but wait a bit, co you can check the result of previous one ..
        setTimeout(function(){
            store.dispatch(loadNewQuestion());
        }, 200);
    } else {

        // TODO put total score in the store .. Don't calculate it ..
        // TODO Make sure, there's security implemented .. So it's not possible to submit results manually ..

        db.sendResults(state.userName, state.correctAnswerCount*100 + state.bonusPoints);
    }

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

function isGameOver() {
    let state = store.getState();

    if (state.currentQuestionCount >= state.allQuestionsCount) {
        store.dispatch({
            type: 'GAME_OVER'
        });
        return true;
    }
    return false;
}

export function loadNewQuestion() {

    let state = store.getState();
    let allCountries = state.allCountries;
    let currentQuestionCount = state.currentQuestionCount;

    let country = getRandomCountry(allCountries);
    let randomOptions = getRandomOptions(allCountries);

    return loadNewQuestionAction(country, randomOptions, currentQuestionCount);
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

export function introFormIsNotValid() {
    return {
        type: 'INTRO_FORM_NOT_VALID',
        introFormValid: false
    }
}

export function introFormIsValid() {
    return {
        type: 'INTRO_FORM_VALID',
        introFormValid: true
    }
}

export function startApplicationAndLoadQuestion() {
    let state = store.getState();
    let allCountries = state.allCountries;
    let introFormValid = state.infoFormValid;

    (state.userName === undefined) ? introFormValid = false : introFormValid = true;

    store.dispatch(resetState());

    if (introFormValid) {
        store.dispatch(introFormIsValid());
        store.dispatch(startApplication());
        store.dispatch(loadNewQuestion(allCountries));
    } else {
        store.dispatch(introFormIsNotValid());
    }
}

export function decreaseBonus(decreaseStep) {
    store.dispatch(decreaseBonusPoints(decreaseStep));
}

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

export function loadResults(res) {
    store.dispatch({
        type: 'RESULTS_LOADED',
        results: res
    })
}

export function setUsername(username) {
    store.dispatch({
        type: 'SET_USERNAME',
        userName: username
    })
}

export function resetState() {
    return {
        type: 'RESET_STATE',
        applicationStarted:false,
        bonusPoints:1000,
        correctAnswerCount:0,
        currentQuestionCount:0,
        gameOver:false,
        incorrectAnswerCount:0,
        introFormValid:true,
        resultsLoaded:true,
        startAppButtonPressed:true,
    }
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