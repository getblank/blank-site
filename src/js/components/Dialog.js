import React, {Component} from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Done from "material-ui/svg-icons/action/done";
import Error from "material-ui/svg-icons/alert/error-outline";
import {getURLParameter, removeURLParameter} from "../utils";

const iconStyles = {
    marginRight: 24,
    verticalAlign: "middle",
};

class BlankDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: "",
            body: "",
        };
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        let data = getURLParameter("blank_dialog");
        if (data) {
            let decodedBase64 = decodeURIComponent(data);
            let encoded = atob(decodedBase64);
            let json = decodeURIComponent(encoded);
            try {
                let dialog = JSON.parse(json);
                let state = {
                    open: true,
                    title: (
                        <div>
                            {dialog.type === "error" && <Error style={iconStyles} color="#F44336" />}
                            {dialog.type === "success" && <Done style={iconStyles} color="#43A047" />}
                            {dialog.title}
                        </div>
                    ),
                    body: dialog.body,
                    okLabel: dialog.buttonLabel,
                    type: dialog.type,
                };
                this.setState(state);
            } catch (e) {
                console.log("BLANK_DIALOG_ERROR:", e);
            }
        }
    }

    close() {
        let search = removeURLParameter("blank_dialog");
        window.location.assign(window.location.pathname + search);
    }

    render() {
        return (
            <Dialog
                title={this.state.title}
                actions={[<FlatButton
                    label={this.state.okLabel || "OK"}
                    primary={true}
                    onTouchTap={this.close}
                    />]}
                modal={true}
                open={this.state.open}>
                {this.state.body}
            </Dialog>
        );
    }
}

export default BlankDialog;