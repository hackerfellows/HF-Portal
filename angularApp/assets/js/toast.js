
function showToastSuccess(text) {
    $('.toast-success').text(text);
    $('.toast-success').stop().fadeIn(400).delay(3000).fadeOut(400);
}

function showToastFailure(text) {
    $('.toast-failure').text(text);
    $('.toast-failure').stop().fadeIn(400).delay(3000).fadeOut(400);
}

function showToastInfo(text) {
    $('.toast-info').text(text);
    $('.toast-info').stop().fadeIn(400).delay(3000).fadeOut(400);
}
