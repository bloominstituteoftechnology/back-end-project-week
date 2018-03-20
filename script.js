
// Make remove buttons visible only on hovering over the note 

function hoverElements() {
    // Show the remove button when mouse pointer enters the note 
    $('.note').mouseenter(function() {
        let e = $(this).find('.remove-btn').fadeIn(250);
    });

    // Hide the remove button when mouse pointer leaves the note 
    $('.note').mouseleave(function() {
        let e = $(this).find('.remove-btn').fadeOut(250);
    });
}

/*
$(document).ready(function() {
    // Hide all remove buttons by default 

    $('.remove-btn').hide();

    setInterval(hoverElements, 20);
});
*/
