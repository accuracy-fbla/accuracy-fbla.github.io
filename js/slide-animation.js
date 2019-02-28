$(document).ready(function() {

    //window and animation items
    var animation_elements = $.find('.animation-element');
    var web_window = $(window);

    //check to see if any animation containers are currently in view
    function check_if_in_view() {
        var window_height = web_window.height();
        var window_top_position = web_window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        //iterate through elements to see if its in view
        $.each(animation_elements, function() {

            var element = $(this);
            var element_height = $(element).outerHeight();
            var element_top_position = $(element).offset().top;
            var element_bottom_position = (element_top_position + element_height);

            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
                element.addClass('in-view');
            }
            /*
            This will have the slide animation every time the object comes into view.
            else {
                element.removeClass('in-view');
            }
            */
        });

    }

    //on or scroll, detect elements in view
    $(window).on('scroll resize', function() {
        check_if_in_view()
    });
    //trigger our scroll event on initial load
    $(window).trigger('scroll');

});