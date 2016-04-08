export function getResults() {
    return $.ajax({
        method: 'GET',
        // TODO Hardcoded URL, needs to be changed ..
        url: "http://capitals.local.d/stats",
        context: document.body,
        data: {count: 3}
    });
}

export function sendResults(userName, score, ca, ia) {
    $.ajax({
        method: 'GET',
        // TODO Hardcoded URL, needs to be changed ..
        url: "http://capitals.local.d/stats/create",
        context: document.body,
        data: {userName: userName, score: score, correctAnswers: ca, incorrectAnswers: ia}
    })
}

