const EMPTY_EMAIL_ERROR = "Укажите email";
const emptyData = {
    email: "",
    emailError: EMPTY_EMAIL_ERROR,
    accepted: true,
};
const emptyState = {
    data: emptyData,
    sent: false,
    fetching: false,
    ok: false,
    openDialog: false,
};

export default function search(state = emptyState, action) {
    switch (action.type) {
        case "SUBSCRIBE_FORM_CHANGE": {
            let data = Object.assign({}, state.data);
            data[action.prop] = action.value;
            data.emailError = data.email ? (/^\S+@\S+\.\S+$/.test(data.email) ? "" : "Укажите корректный email") : EMPTY_EMAIL_ERROR;
            return Object.assign({}, state, { data: data });
        }
        case "SUBSCRIBE_REQUEST": {
            return Object.assign({}, state, { sent: true, fetching: true });
        }
        case "SUBSCRIBE_RESPONSE": {
            return Object.assign({}, state, { data: emptyData, ok: true, openDialog: true, sent: false, fetching: false });
        }
        case "SUBSCRIBE_ERROR": {
            return Object.assign({}, state, { data: emptyData, ok: false, openDialog: true, sent: false, fetching: false });
        }
        case "SUBSCRIBE_CLOSE_DIALOG": {
            return Object.assign({}, state, { openDialog: false });
        }
        default:
            return state;
    }
}