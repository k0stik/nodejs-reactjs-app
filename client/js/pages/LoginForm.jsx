import React, { Component, PropTypes } from 'react'
import {Button, Textfield, Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, IconButton} from 'react-mdl';
import api from '../api'

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault()

        console.log(this);

        // const email = this.refs.email.value
        // const pass = this.refs.pass.value

        // auth.login(email, pass, (loggedIn) => {
        //     if (!loggedIn)
        //         return this.setState({ error: true })

        //     const { location } = this.props

        //     if (location.state && location.state.nextPathname) {
        //         this.context.router.replace(location.state.nextPathname)
        //     } else {
        //         this.context.router.replace('/')
        //     }
        // })


                 //                   className="is-invalid"
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <Card shadow={0} style={{'display':'block', 'width':'auto'}}>
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>
                        Login Form
                    </CardTitle>
                    <CardText>
                        <Grid>
                            <Cell col={12}>
                                <Textfield
                                    onChange={() => {}}
                                    label="Email"
                                    floatingLabel
                                />
                            </Cell>
                            <Cell col={12}>
                                <Textfield
                                    pattern="-?[0-9]*(\.[0-9]+)?"
                                    error="Input is not a number!"
                                    onChange={() => {}}
                                    label="Password"
                                    type="password"
                                    floatingLabel
                                />
                            </Cell>
                        </Grid>
                    </CardText>
                    <CardActions border>
                        <Button colored>Login</Button>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>
            </form>
        )
    }
}