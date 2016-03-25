export function sendResults(userName, score) {
    $.ajax({
        method: 'GET',
        // TODO Hardcoded URL, needs to be changed ..
        url: "http://capitals.local.d/stats/create",
        context: document.body,
        data: {userName: userName, score: score}
    }).done(function() {
        $( this ).addClass( "done" );
    });
}