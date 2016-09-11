import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Checkbox from "material-ui/Checkbox";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Done from "material-ui/svg-icons/action/done";
import Error from "material-ui/svg-icons/alert/error-outline";
import CircularProgress from "material-ui/CircularProgress";

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
    extraField: {
        marginRight: "30px",
        verticalAlign: "top",
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
        minHeight: "53px",
    },
    fetchingContainer: {
        width: "163px",
        flexShrink: 0,
        textAlign: "center",
    },
    dialogFetchingContainer: {
        padding: "36px 0",
        textAlign: "center",
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
    icon: {
        marginRight: 24,
        verticalAlign: "middle",
    },
};

const componentName = ({
    data,
    dialogData,
    sent,
    fetching,
    ok,
    openDialog,
    dialogFetching,
    handleFormChange,
    handleSubmit,
    handleSubmitExtra,
    handleCloseDialog,
}) => {
    const closeDialog = <FlatButton
        label="Закрыть"
        labelStyle={{ color: "#999" }}
        onTouchTap={handleCloseDialog}
        disabled={dialogFetching}
        />;
    const sendExtra = <FlatButton
        label="Отправить"
        primary={true}
        onTouchTap={handleSubmitExtra}
        disabled={dialogFetching}
        />;
    return (
        <div style={styles.root}>
            <form>
                <TextField
                    style={styles.field}
                    inputStyle={styles.fieldInput}
                    floatingLabelStyle={styles.fieldLabel}
                    errorStyle={styles.error}
                    floatingLabelText="Ваш email"
                    errorText={sent && data.emailError}
                    fullWidth={true}
                    value={data.email}
                    onChange={handleFormChange.bind(this, "data", "email") }
                    disabled={fetching}
                    />
                <div style={styles.btnContainer}>
                    <Checkbox
                        label="Я хочу получать последние новости, анонсы и предложения по платформе Blank"
                        checked={data.accepted}
                        style={styles.checkboxStyle}
                        labelStyle={styles.checkboxLabelStyle}
                        onCheck={handleFormChange.bind(this, "data", "accepted") }
                        disabled={fetching}
                        />
                    {fetching ?
                        <div style={styles.fetchingContainer}>
                            <CircularProgress size={.4} />
                        </div>
                        :
                        <RaisedButton
                            type="submit"
                            label="Присоединиться"
                            disabled={!data.accepted}
                            primary={true}
                            style={styles.btn}
                            onClick={handleSubmit}
                            />
                    }
                </div>
            </form>
            <Dialog
                title={ok ? <div><Done style={styles.icon} color="#43A047"/>Спасибо, email отправлен!</div> :
                    <div><Error style={styles.icon} color="#F44336"/>Похоже, что-то пошло не так...</div>}
                actions={[closeDialog, ok && sendExtra]}
                modal={false}
                open={openDialog}
                onRequestClose={handleCloseDialog}
                >
                {ok ?
                    <form id="subscribe-extra-form">
                        <p>
                            Мы рады, что вас заинтересовала платформа Blank.
                            Если у вас есть время, мы бы хотели познакомиться с вами:
                        </p>
                        {dialogFetching ?
                            <div style={styles.dialogFetchingContainer}>
                                <CircularProgress />
                            </div>
                            :
                            <div>
                                <TextField
                                    id="subscribe-name-input"
                                    style={styles.extraField}
                                    tabIndex="0"
                                    errorStyle={styles.error}
                                    floatingLabelText="Ваше имя"
                                    floatingLabelFixed={true}
                                    value={dialogData.name}
                                    onChange={handleFormChange.bind(this, "dialogData", "name") }
                                    />
                                <SelectField
                                    id="activity-select"
                                    value={dialogData.activity}
                                    style={styles.extraField}
                                    floatingLabelText="Чем вы занимаетесь?"
                                    floatingLabelFixed={true}
                                    onChange={handleFormChange.bind(this, "dialogData", "activity") }
                                    >
                                    <MenuItem value="" primaryText="" />
                                    <MenuItem value="student" primaryText="Учёба" />
                                    <MenuItem value="freelance" primaryText="Фриланс" />
                                    <MenuItem value="company" primaryText="Работа в компании" />
                                    <MenuItem value="week" primaryText="Собственный бизнес" />
                                    <MenuItem value="other" primaryText="Свой вариант" />
                                </SelectField>
                                {dialogData.activity === "other" && <TextField
                                    id="customactivity-input"
                                    style={styles.extraField}
                                    errorStyle={styles.error}
                                    floatingLabelText="Свой вариант занятий"
                                    floatingLabelFixed={true}
                                    value={dialogData.customactivity}
                                    onChange={handleFormChange.bind(this, "dialogData", "customactivity") }
                                    />}
                                <TextField
                                    id="company-input"
                                    style={styles.extraField}
                                    errorStyle={styles.error}
                                    floatingLabelText="Название компании (ВУЗ-а)"
                                    floatingLabelFixed={true}
                                    value={dialogData.company}
                                    onChange={handleFormChange.bind(this, "dialogData", "company") }
                                    />
                                <button type="submit"
                                    onClick={handleSubmitExtra}
                                    tabIndex="-1"
                                    style={{ position: "absolute", left: -9999, width: 1, height: 1 }}
                                    >
                                </button>
                            </div>
                        }
                    </form>
                    :
                    <p>Попробуйте пожалуйста еще раз позже.</p>
                }
            </Dialog>
        </div>
    );
};

export default componentName;