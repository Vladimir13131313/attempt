$(document).ready(function(){
    $("#login_form").dialog({
        autoOpen: true,
        width: 624,
        height: 578,
        modal: true,
        close: function() {
            form[ 0 ].reset();
        }
    })
});