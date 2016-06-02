import React, { Component, PropTypes } from 'react'
import reactMixin from 'react-mixin'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
    }

    login(e) {
        e.preventDefault();
        // Here, we call an external AuthService. We'll create it in the next step
        // Auth.login(this.state.user, this.state.password)
        //   .catch(function(err) {
        //     console.log("Error logging in", err);
        //   });
    }

    render() {
        return (
            <form role="form">
                <div className="form-group">
                    <input type="text" valueLink={this.linkState('user')} placeholder="Username" />
                    <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
                </div>
                <button type="submit" onClick={(e) => this.login(e)}>Submit</button>
            </form>
        );
    }
}

// We're using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
reactMixin(Login.prototype, React.addons.LinkedStateMixin);