import React, { Component, PropTypes } from 'react'
import {Button, Textfield, Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, IconButton} from 'react-mdl';
import api from '../api'

export default class RegistrationForm extends Component {

    static errorMessages() {
        return {
            'REQUIRED': 'field is required',
            'INVALID': 'field is invalid',
            'FIELDS_NOT_EQUAL': 'Passwod and Confirm password must be equal',
            'DEFAULT': 'field is invalid',
            'TOO_SHORT': 'field is too short'
        };
    }

    static noErrorFieldState() {
        return {
            error: '',
            pattern: '*'
        };
    }

    static formFields() {
        return ['Name', 'Login', 'Email', 'Password', 'ConfirmPassword'];
    }

    constructor(props) {
        super(props);

        var initialState = {
            fields: {},
            errors: {}
        };

        RegistrationForm.formFields().forEach(function(field) {
            initialState['fields'][field] = '';
            initialState['errors'][field] = RegistrationForm.noErrorFieldState();
        })

        this.state = initialState;
    }

    handleSubmit(event) {
        var self = this;

        event.preventDefault();

        api.users.create(this.state.fields).then(function(response) {
            self.handleSuccessServerResponse(response);
        }).catch(function(error) {
            self.handleErrorServerResponse(error);
        });
    }

    handleErrorServerResponse(error) {
        var errorMessages = RegistrationForm.errorMessages();
        var noErrorFieldState = RegistrationForm.noErrorFieldState();
        var formFields = RegistrationForm.formFields();
        var state = Object.assign({}, this.state);

        formFields.forEach(function(fieldName) {
            if(error.fields[fieldName]) {
                var errorCode = error.fields[fieldName];
                var errorPattern = '';
                var errorMessage = errorMessages[errorCode]
                                    ? errorMessages[errorCode]
                                    : errorMessages['DEFAULT'];
                state['errors'][fieldName] = {
                    'error': errorMessage,
                    'pattern': errorPattern
                }
            } else {
                state['errors'][fieldName] = noErrorFieldState;
            }
        });

        this.setState(state);
    }

    handleSuccessServerResponse(response) {
        console.log(response);
    }

    handleTextfieldChange(event) {
        var fields = Object.assign({}, this.state.fields);
        var errors = Object.assign({}, this.state.errors);

        fields[event.target.name] = event.target.value;

        if(errors[event.target.name]) {
            errors[event.target.name] = RegistrationForm.noErrorFieldState();
        }

        this.setState({
            fields,
            errors
        });
    }

    render() {


        var fieldsErrors = {
            Name: {
                pattern: this.state.errors.Name?"":"*"
            }
        };

        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <Card shadow={0} style={{'display':'block', 'width':'auto'}}>
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>
                        Registration Form
                    </CardTitle>
                    <CardText>
                        <Grid>
                            <Cell col={12}>
                                <Textfield
                                    onChange={(e) => this.handleTextfieldChange(e)}
                                    pattern={this.state.errors.Name.pattern}
                                    error={this.state.errors.Name.error}
                                    label="Name"
                                    floatingLabel
                                    name="Name"
                                    value={this.state.fields.Name}
                                />
                            </Cell>
                            <Cell col={12}>
                                <Textfield
                                    onChange={(e) => this.handleTextfieldChange(e)}
                                    label="Login"
                                    pattern={this.state.errors.Login.pattern}
                                    error={this.state.errors.Login.error}
                                    floatingLabel
                                    name="Login"
                                    value={this.state.fields.Login}
                                />
                            </Cell>
                            <Cell col={12}>
                                <Textfield
                                    onChange={(e) => this.handleTextfieldChange(e)}
                                    label="Email"
                                    pattern={this.state.errors.Email.pattern}
                                    error={this.state.errors.Email.error}
                                    floatingLabel
                                    name="Email"
                                    value={this.state.fields.Email}
                                />
                            </Cell>
                            <Cell col={12}>
                                <Textfield
                                    onChange={(e) => this.handleTextfieldChange(e)}
                                    label="Password"
                                    type="password"
                                    pattern={this.state.errors.Password.pattern}
                                    error={this.state.errors.Password.error}
                                    floatingLabel
                                    name="Password"
                                    value={this.state.fields.Password}
                                />
                            </Cell>
                            <Cell col={12}>
                                <Textfield
                                    onChange={(e) => this.handleTextfieldChange(e)}
                                    label="Confirm password"
                                    type="password"
                                    pattern={this.state.errors.ConfirmPassword.pattern}
                                    error={this.state.errors.ConfirmPassword.error}
                                    floatingLabel
                                    name="ConfirmPassword"
                                    value={this.state.fields.ConfirmPassword}
                                />
                            </Cell>
                        </Grid>
                    </CardText>
                    <CardActions border>
                        <Button colored>Register</Button>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>
            </form>
        )
    }
}
