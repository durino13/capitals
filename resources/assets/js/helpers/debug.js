
/*
 * Function compares current state of the application with the state supplied in the function parameter and outputs
 * the state differences ...
 */
export function diffState(currentState, oldState) {
    let differencesArray = [];

    //console.log('old: '+ oldState.allCountries);
    //console.log('current: '+ currentState.allCountries);

    for (var key in currentState) {
        if (currentState[key] != oldState[key]) {
            differencesArray.push('Key changed: "'+key +'": Old value: "'+oldState[key]+'", New value: "'+currentState[key]+ '"');
        }
    }

    return differencesArray;
}
