$(document).ready(function(){
    const log_email = $("#input_form_email"),
        log_password = $("#input_form_password"),
        sign_email = $("#input_form_email_su"),
        sign_password = $("#input_form_password_su"),
        login_form = $("#login_form").dialog({
            autoOpen: false,
            width: 624,
            height: 578,
            modal: true,
            draggable: false,
            resizable: false,
            close: function() {
                log_email.val("");
                log_password.val("");
            }
        }),
        signup_form = $("#signup_form").dialog({
            autoOpen: false,
            width: 624,
            height: 578,
            modal: true,
            draggable: false,
            resizable: false,
            close: function() {
                sign_email.val("");
                sign_password.val("");
            }
        }),
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        log_allFields = $([]).add(log_email).add(log_password),
        sign_allFields = $([]).add(sign_email).add(sign_password);

    function checkLength (object, min) {
        if (object.val().length < min) {
            object.addClass("ui-state-error");
            return false
        } else {
            return true
        }
    }

    function checkRegex (object, regex) {
        if (!regex.test(object.val())) {
            object.addClass("ui-state-error");
            return false;
        } else {
            return true;
        }
    }

    function User(email, password, allFields) {
        let valid = true;
        allFields.removeClass("ui-state-error");
        valid = checkLength(email, 10) && valid;
        valid = checkRegex(email, emailRegex) && valid;

        valid = checkLength(password, 10) && valid;
        return valid;
    }

    function open_login_form() {
        login_form.dialog("open");
    }
    function open_signup_form() {
        signup_form.dialog("open");
    }
    $("#homepage_log_in_btn").click(function () {
        open_login_form();
    });
    $("#homepage_signup_btn").click(function () {
        open_signup_form();
    });
    $("#login_modal_btn").click(function () {
        open_login_form();
        signup_form.dialog("close");
    });
    $("#signup_modal_btn").click(function () {
        open_signup_form()
        login_form.dialog("close");
    });
    $("#login_btn").click(function (event) {
        event.preventDefault();
        if (User(log_email, log_password, log_allFields)) {
            if (log_email.val() === String(localStorage.getItem("email"))) {
                if (log_password.val() === String(localStorage.getItem("password"))) {
                    console.log(true)
                    console.log(String(localStorage.getItem("email")));
                    console.log(String(localStorage.getItem("password")));
                    window.location="../html/wharehouse_list_page.html";
                } else {
                    log_password.addClass("ui-state-error");
                }
            } else {
                log_email.addClass("ui-state-error");
            }
        }
    });
    $("#signup_btn").click(function (event) {
        event.preventDefault();
        if (User(sign_email, sign_password, sign_allFields)) {
            localStorage.setItem("email", sign_email.val());
            localStorage.setItem("password", sign_password.val());
            console.log(String(localStorage.getItem("email")));
            console.log(String(localStorage.getItem("password")));
            open_login_form();
            signup_form.dialog("close");
        }
    });
});