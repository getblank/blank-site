import {BLANK_URI} from "../const";

const _handleFormChange = (prop, value) => ({
    type: "SUBSCRIBE_FORM_CHANGE",
    prop: prop,
    value: value,
});

export const handleFormChange = (prop, value, value2) => {
    if (value2 != null) {
        value = value2; //checkbox
    } else if (value && value.target) {
        value = value.target.value; //text input
    }
    return dispatch => {
        dispatch(_handleFormChange(prop, value));
    };
};

const subscribeRequest = () => ({
    type: "SUBSCRIBE_REQUEST",
});

const subscribeResponse = () => ({
    type: "SUBSCRIBE_RESPONSE",
});

const subscribeError = (e) => ({
    type: "SUBSCRIBE_ERROR",
    error: e,
});

export const handleSubmit = () => {
    return (dispatch, getState) => {
        dispatch(subscribeRequest());
        let state = getState();
        if (state.subscribeForm.data.emailError) {
            return;
        }
        var formData = new FormData();
        formData.append("email", state.subscribeForm.data.email);
        return fetch(`${BLANK_URI}/hooks/land/`, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(json => dispatch(subscribeResponse(json)))
            .catch(e => dispatch(subscribeError(e)));
    };
};

export const handleCloseDialog = () => ({
    type: "SUBSCRIBE_CLOSE_DIALOG",
});