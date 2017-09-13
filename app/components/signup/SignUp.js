import React, { Component } from 'react'
import { Grid, FormGroup, FormControl, Radio, ControlLabel, Button } from 'react-bootstrap'
import Redirect from 'react-router-dom'
import './signup.css'
import { auth } from '../../helpers/auth'
import { ref, firebaseAuth } from '../../config/constants'
import { CompanyDashboard } from '../dashboard/companydashboard/CompanyDashboard'
import { StudentDashboard } from '../dashboard/studentdashboard/StudentDashboard'
import { StudentDetails } from '../dashboard/studentdashboard/StudentDetails'

const setErrorMsg = (error) => ({registerError: error.message})

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      name: '',
      email: '',
      password: '',
      type: ''
    }
  }

  handleChange = (e) => {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }

  handleClick = (e) => {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.state.email, this.state.password)
      .catch((e) => this.setState(setErrorMsg(e)))
      .then((info) => {
        const uid = firebaseAuth().currentUser.uid
        ref.child(`users/${uid}/info`).set({
          name: this.state.name,
          email: this.state.email,
          uid,
          type: this.state.type
        })
      })
  }

  render(){
    return (
      <Grid>
        <form onSubmit={this.handleSubmit} className='form-signin'>
          <ControlLabel><h2>Sign up</h2></ControlLabel>
          <FormGroup>
            <ControlLabel>Full Name</ControlLabel>
            <FormControl
              required
              type='text'
              value={this.state.name}
              name='name'
              id='inputName'
              placeholder='Your full name'
              onChange={this.handleChange}
            />
            <ControlLabel>Email address</ControlLabel>
            <FormControl
              required
              type='email'
              value={this.state.email}
              name='email'
              id='inputEmail'
              placeholder='yourname@example.com'
              onChange={this.handleChange}
            />
            <ControlLabel>Password</ControlLabel>
            <FormControl
              required
              type='password'
              value={this.state.password}
              name='password'
              id='inputPassword'
              placeholder='your password'
              onChange={this.handleChange}
            />
            <FormGroup value={this.state.value}>
              <Radio required name='type' id='company' value='company' onClick={this.handleClick} inline>Company</Radio>
              <Radio required name='type' id='student' value='student' onClick={this.handleClick} inline>Student</Radio>
            </FormGroup>
            {
              this.state.registerError &&
                <div className='alert alert-danger' role='alert'>
                  <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                  <span className='sr-only'>Error:</span>
                  &nbsp;{this.state.registerError}
                </div>
            }
            <Button block bsStyle='primary' bsSize='lg' type='submit'>Submit</Button>
          </FormGroup>
        </form>
      </Grid>
    )
  }
}
