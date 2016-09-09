import React, {Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SubscribeActions from "../actions/subscribeActions";
import SubscribeForm from "../components/SubscribeForm";

class SubscribeFormContainer extends Component {
    render() {
        return <SubscribeForm {...this.props} />;
    }
}

export default connect(
    state => state.subscribeForm,
    dispatch => (bindActionCreators(SubscribeActions, dispatch))
)(SubscribeFormContainer);