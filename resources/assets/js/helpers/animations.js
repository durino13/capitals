export function animate(selector) {
    $(selector).addClass('animated flash');
    window.setTimeout(() =>
        $(selector).removeClass('flash'), 1300
    );
}