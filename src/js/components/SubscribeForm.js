import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from 'material-ui/FlatButton';
import Checkbox from "material-ui/Checkbox";
import Dialog from "material-ui/Dialog";

const styles = {
    root: {
        margin: "0 auto",
        padding: "24px 0",
        maxWidth: 500,
        textAlign: "initial",
    },
    field: {
        textAlign: "center",
    },
    fieldInput: {
        color: "#fff",
    },
    fieldLabel: {
        color: "rgba(255, 255, 255, .7)",
    },
    error: {
        color: "#FF8A80",
    },
    btnContainer: {
        display: "flex",
        marginTop: "14px",
        alignItems: "flex-start",
    },
    btn: {
        flexShrink: 0,
    },
    checkboxStyle: {
        display: "block",
        marginRight: "14px",
    },
    checkboxLabelStyle: {
        color: "#fff",
        fontSize: ".7rem",
        lineHeight: ".9rem",
    },
};

const componentName = ({
    data,
    dialogData,
    sent,
    ok,
    openDialog,
    handleFormChange,
    handleSubmit,
    handleCloseDialog,
    handleDialogFormChange}) => {
    const closeDialog = <FlatButton
        label="Закрыть"
        primary={true}
        onTouchTap={handleCloseDialog}
        />;
    return (
        <div style={styles.root}>
            <TextField
                style={styles.field}
                inputStyle={styles.fieldInput}
                floatingLabelStyle={styles.fieldLabel}
                errorStyle={styles.error}
                floatingLabelText="Ваш email"
                errorText={sent && data.emailError}
                fullWidth={true}
                value={data.email}
                onChange={handleFormChange.bind(this, "email") }
                />
            <div style={styles.btnContainer}>
                <Checkbox
                    label="Я хочу получать последние новости, анонсы и предложения по платформе Blank"
                    checked={data.accepted}
                    style={styles.checkboxStyle}
                    labelStyle={styles.checkboxLabelStyle}
                    onCheck={handleFormChange.bind(this, "accepted") }
                    />
                <RaisedButton
                    label="Присоединиться"
                    disabled={!data.accepted}
                    primary={true}
                    style={styles.btn}
                    onClick={handleSubmit}
                    />
            </div>
            <Dialog
                title={ok ? "Спасибо, что заинтересовались платформой Blank!" : "Похоже, что-то пошло не так..."}
                actions={[closeDialog]}
                modal={false}
                open={openDialog}
                onRequestClose={handleCloseDialog}
                >
                {ok ?
                    <div>
                        Если вам не трудно, оставьте немного информации о себе:
                        <TextField
                            style={styles.field}
                            inputStyle={styles.fieldInput}
                            floatingLabelStyle={styles.fieldLabel}
                            errorStyle={styles.error}
                            floatingLabelText="Ваше имя"
                            fullWidth={true}
                            value={dialogData.name}
                            onChange={handleDialogFormChange.bind(this, "email") }
                            />
                    </div>
                    :
                    <p>Попробуйте пожалуйста еще раз позже.</p>
                }
            </Dialog>
        </div>
    );
};

export default componentName;