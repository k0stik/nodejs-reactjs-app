import React, { Component, PropTypes } from 'react';
import {Tabs, Tab, Grid, Cell} from 'react-mdl';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default class LoginOrRegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabId: 0
        }
        this.forms = [<LoginForm />, <RegistrationForm />];
    }

    tabTogleHangler(tabId) {
        this.setState({activeTabId: tabId})
    }

    render() {
        var activeForm = this.forms[this.state.activeTabId];
        return  <div>
                    <Tabs activeTab={this.state.activeTabId}
                          onChange={(tabId) => this.tabTogleHangler(tabId)}
                          ripple>
                        <Tab>Login</Tab>
                        <Tab>Register</Tab>
                    </Tabs>
                    <Grid>
                        <Cell col={4} tablet={1} phone={1}></Cell>
                        <Cell col={4} tablet={6} phone={6}>
                            {activeForm}
                        </Cell>
                        <Cell col={4} tablet={1} phone={1}></Cell>
                    </Grid>
                </div>
    }
}