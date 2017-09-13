import React, { Component } from 'react'
import { Grid, FormGroup, FormControl, Radio, ControlLabel, Checkbox, Button } from 'react-bootstrap'
import { login, resetPassword } from '../../helpers/auth'
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import './signin.css'

const setErrorMsg = (error) => ({loginMessage: error})

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'admin@admin.com',
      password: 'admindashboard',
      loginMessage: null
    }
  }

  handleChange = (event) => {
    const target = event.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    login(this.state.email, this.state.password)
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password.'))
      })
  }

  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.email}`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }

  render(){
    return (
      <Grid>
        <form className='form-signin' onSubmit={this.handleSubmit}>
          <ControlLabel><h2>Please Sign in</h2></ControlLabel>
          <FormGroup>
            <FormControl
              required
              type='email'
              name='email'
              value={this.state.email}
              id='inputEmail'
              placeholder='yourname@example.com'
              onChange={this.handleChange}
            />
            <FormControl
              required
              type='password'
              name='password'
              value={this.state.password}
              id='inputPassword'
              placeholder='your password'
              onChange={this.handleChange}
            />
            {
              this.state.loginMessage &&
                <div className='alert alert-danger' role='alert'>
                  <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                  <span className='sr-only'>Erro:</span>
                  &nbsp;{this.state.loginMessage} <a href='#' onClick={this.resetPassword} className='alert-link'>Forgot Password?</a>
                </div>
            }
            <Button bsStyle='primary' bsSize='lg' type='submit' block>Sign in</Button>
          </FormGroup>
        </form>
      </Grid>
    )
  }
}
