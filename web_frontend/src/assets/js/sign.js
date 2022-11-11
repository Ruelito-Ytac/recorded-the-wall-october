document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("sign_in_form").addEventListener("submit", submitSignIn);   /* This will submit the sign in form. */
    document.getElementById("sign_up_form").addEventListener("submit", submitSignUp);   /* This will submit the sign up form. */
    document.addEventListener("click", selectSignPage);                                 /* This will toggle the sign page. */
});

/**
 * DOCU: This will toggle the sign page.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const selectSignPage = (event) => {
    if(event.target.classList[0] === "sign_item"){
        toggleSelectedSignPage(event);
    }
}

/**
 * DOCU: This will submit the sign in form.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const submitSignIn = (event) => {
    event.preventDefault();

    validateInput(document.querySelectorAll("#sign_in_form .required_input"));

    if(!document.querySelectorAll("#sign_in_form .input_error").length){
        window.location.href = `${ window.location.origin }/web_frontend/src/views/user/timeline.html`
    }
}

/**
 * DOCU: This will submit the sign up form.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const submitSignUp = (event) => {
    event.preventDefault();

    validateInput(document.querySelectorAll("#sign_up_form .required_input"));
    (!document.querySelectorAll("#sign_up_form .input_error").length) && toggleSelectedSignPage(event);
}

/**
 * DOCU: This will validate the selected input
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param selected_input - This will fetch all the selected required input.
 */
const validateInput = (selected_input) => {
    selected_input.forEach(input_item => {
        (!input_item.value) ? input_item.classList.add("input_error") : input_item.classList.remove("input_error");
    });
}

/**
 * DOCU: This will toggle the sign page to show up.
 * Last Updated Date: October 31, 2022
 * @author Ruelito
 * @param event - This is the event that is triggered when the user hits enter.
 */
const toggleSelectedSignPage = (event) => {
    document.getElementById("sign_wrapper").querySelectorAll(".hidden")[0].classList.remove("hidden");
    event.target.closest(".sign_block").classList.add("hidden");
}