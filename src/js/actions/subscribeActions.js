import {BLANK_URI} from "../const";

const _handleFormChange = (form, prop, value) => ({
    type: "SUBSCRIBE_FORM_CHANGE",
    form: form,
    prop: prop,
    value: value,
});

export const handleFormChange = (form, prop, value, value2, value3) => {
    if (value3 != null) {
        value = value3; //select
    } else if (value2 != null) {
        value = value2; //checkbox
    } else if (value && value.target) {
        value = value.target.value; //text input
    }
    return dispatch => {
        dispatch(_handleFormChange(form, prop, value));
    };
};

const subscribePreRequest = () => ({
    type: "SUBSCRIBE_PRE_REQUEST",
});

const subscribeRequest = () => ({
    type: "SUBSCRIBE_REQUEST",
});

const subscribeResponse = (result) => ({
    type: "SUBSCRIBE_RESPONSE",
    result: result,
});

const subscribeError = (e) => ({
    type: "SUBSCRIBE_ERROR",
    error: e,
});

export const handleSubmit = (e) => {
    e.preventDefault();
    return (dispatch, getState) => {
        dispatch(subscribePreRequest());
        let state = getState();
        if (state.subscribeForm.data.emailError) {
            return;
        }
        dispatch(subscribeRequest());
        var formData = new FormData();
        formData.append("email", state.subscribeForm.data.email);
        return fetch(`${BLANK_URI}/hooks/landings/land/`, {
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

const subscribeExtraRequest = () => ({
    type: "SUBSCRIBE_EXTRA_REQUEST",
});

const subscribeExtraResponse = () => ({
    type: "SUBSCRIBE_EXTRA_RESPONSE",
});

const subscribeExtraError = (e) => ({
    type: "SUBSCRIBE_EXTRA_ERROR",
    error: e,
});

export const handleSubmitExtra = (e) => {
    e.preventDefault();
    return (dispatch, getState) => {
        dispatch(subscribeExtraRequest());
        let state = getState();
        var formData = new FormData();
        formData.append("subscribeId", state.subscribeForm.subscribeId);
        formData.append("name", state.subscribeForm.dialogData.name || "");
        formData.append("activity", state.subscribeForm.dialogData.activity || "");
        formData.append("customactivity", state.subscribeForm.dialogData.customactivity || "");
        formData.append("company", state.subscribeForm.dialogData.company || "");
        return fetch(`${BLANK_URI}/hooks/landings/extra/`, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(json => dispatch(subscribeExtraResponse(json)))
            .catch(e => dispatch(subscribeExtraError(e)));
    };
};