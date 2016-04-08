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
        state = store.getState();
        db.sendResults(
            state.userName,
            state.correctAnswerCount*100 + state.bonusPoints,
            state.correctAnswerCount,
            state.incorrectAnswerCount
        )
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

//export function introFormIsNotValid(invalidFieldNames) {
//
//    store.dispatch({
//        type: 'INTRO_FORM_NOT_VALID',
//        invalidFieldNames: invalidFieldNames
//    });
//
//}

export function introFormIsValid() {
    return {
        type: 'INTRO_FORM_VALID',
        introFormValid: true
    }
}

export function quit() {
    store.dispatch(displayResults());
}

export function displayResults() {
    return {
        type: 'DEFAULT'
    }
}

function isIntroFormValid() {

    let state = store.getState();
    let isFormValid = true;

    console.log(state.validUsername);

    if (state.userName === '') {
        isFormValid = false;
        store.dispatch({
            type: 'INTRO_FORM_NOT_VALID',
            startAppButtonPressed: true,
            validUsername: false
        })
    }

    console.log(state.captcha);
    if ((state.captcha !== 'Bratislava') && (state.captcha !== 'bratislava')) {
        isFormValid = false;
        store.dispatch({
            type: 'INTRO_FORM_NOT_VALID',
            startAppButtonPressed: true,
            validCaptcha: false
        })
    }

    state = store.getState();
    console.log(state.validUsername);

    return isFormValid;
}

export function startApplicationAndLoadQuestion() {
    // TODO Make state global, so I don't have to fetch it in every function ..
    let state = store.getState();
    let allCountries = state.allCountries;
    let introFormValid = state.infoFormValid;

    // Everytime the application is started, reset the state ...
    store.dispatch(resetState());

    // Validate the input form ..
    introFormValid = isIntroFormValid();

    if (introFormValid) {
        store.dispatch(startApplication());
        store.dispatch(loadNewQuestion(allCountries));
    }
}

export function decreaseBonus(decreaseStep) {
    store.dispatch(decreaseBonusPoints(decreaseStep));
}

// TODO Probably it would be nice to return geographically close countries here ..
function getRandomOptions() {

    // Here I will choose some random countries as answer options ..
    let countries = [];
    let i = 0;

    let state = store.getState();
    let allCountries = state.allCountries;

    // let's load 3 possible 'wrong' answers. The correct answer is not included here ..
    do {
        let country = getRandomCountry(allCountries);
        if (country.option !== '') {
            countries.push(({countryName: country.countryName,option: country.option, correct:'no'}))
            i+=1;
        }
    } while (i < 3)

    return countries;

}

/*
 * Return a random country object from the list of all available countries from the json ..
 */
function getRandomCountry(allCountries) {
    let randomKey;
    // Nasty fix: Some json entries return undefined ..
    do {
        randomKey = Math.floor(Math.random()*allCountries.length)+1;
    } while (allCountries[randomKey] == undefined)
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

export function setCaptcha(c) {
    store.dispatch({
        type: 'SET_CAPTCHA',
        captcha: c
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
        validUsername: true,
        validCaptcha: true,
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