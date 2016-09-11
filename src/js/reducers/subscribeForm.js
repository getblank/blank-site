const EMPTY_EMAIL_ERROR = "Укажите email";
const emptyData = {
    email: "",
    emailError: EMPTY_EMAIL_ERROR,
    // email: "mail@mail.mail",
    // emailError: "",
    accepted: true,
};
const emptyState = {
    data: emptyData,
    dialogData: {
        name: "",
    },
    sent: false,
    fetching: false,
    ok: false,
    subscribeId: null,
    openDialog: false,
    dialogFetching: false,
};

export default function search(state = emptyState, action) {
    switch (action.type) {
        case "SUBSCRIBE_FORM_CHANGE": {
            let data = Object.assign({}, state[action.form]);
            data[action.prop] = action.value;
            if (action.form === "data") {
                data.emailError = data.email ? (/^\S+@\S+\.\S+$/.test(data.email) ? "" : "Укажите корректный email") : EMPTY_EMAIL_ERROR;
            }
            let statePart = {};
            statePart[action.form] = data;
            return Object.assign({}, state, statePart);
        }
        case "SUBSCRIBE_PRE_REQUEST": {
            return Object.assign({}, state, { sent: true });
        }
        case "SUBSCRIBE_REQUEST": {
            return Object.assign({}, state, { sent: true, fetching: true });
        }
        case "SUBSCRIBE_RESPONSE": {
            return Object.assign({}, state, { data: emptyData, ok: true, openDialog: true, subscribeId: action.result, sent: false, fetching: false });
        }
        case "SUBSCRIBE_ERROR": {
            console.log("SUBSCRIBE_ERROR", action.error);
            return Object.assign({}, state, { data: emptyData, ok: false, openDialog: true, sent: false, fetching: false });
        }
        case "SUBSCRIBE_EXTRA_REQUEST": {
            return Object.assign({}, state, { dialogFetching: true });
        }
        case "SUBSCRIBE_EXTRA_RESPONSE": {
            return Object.assign({}, emptyState);
        }
        case "SUBSCRIBE_EXTRA_ERROR": {
            console.log("SUBSCRIBE_EXTRA_ERROR", action.error);
            return Object.assign({}, emptyState);
        }
        case "SUBSCRIBE_CLOSE_DIALOG": {
            return Object.assign({}, emptyState);
        }
        default:
            return state;
    }
}