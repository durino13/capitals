export function getResults() {
    return $.ajax({
        method: 'GET',
        // TODO Hardcoded URL, needs to be changed ..
        url: baseUrl()+ "/stats",
        context: document.body,
        data: {count: 3}
    });
}

export function sendResults(userName, score) {
    $.ajax({
        method: 'GET',
        // TODO Hardcoded URL, needs to be changed ..
        url: baseUrl()+ "/stats/create",
        context: document.body,
        data: {userName: userName, score: score}
    })
}

function baseUrl() {
    let pathArray = location.href.split( '/' );
    let protocol = pathArray[0];
    let host = pathArray[2];
    return protocol + '//' + host;
}

