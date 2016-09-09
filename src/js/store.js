import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import reducer from "./reducers/index";

let persistedState = loadState();
const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(thunkMiddleware, createLogger())
);

function loadState() {
    let stateStr = localStorage.getItem("state");
    if (stateStr == null) {
        return undefined;
    }
    try {
        return JSON.parse(stateStr);
    } catch (e) { return undefined }
}

export const saveState = function() {
    // let _state = store.getState();
    // let state = {
    //     "user": _state.user,
    // };
    // try {
    //     localStorage.setItem("state", JSON.stringify(state));
    // } catch (e) { return }
};

window.addEventListener("beforeunload", () => {
    saveState();
});

export default store;