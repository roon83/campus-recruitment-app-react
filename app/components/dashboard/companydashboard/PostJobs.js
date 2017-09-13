import React, { Component } from 'react'
import { firebaseAuth, base } from '../../../config/constants'
import { ControlLabel, FormControl, FormGroup, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class PostJobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobTitle: '',
      salary: '',
      jobDescription: '',
      postedJobs: {}
    }
  }

  addJob = (job) => {
    const postedJobs = {...this.state.postedJobs}
    const timeStamp = Date.now()
    postedJobs[`job-${timeStamp}`] = job
    this.setState({ postedJobs })
  }

  handleChange = (e) => {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const Job = {
      jobTitle: this.state.jobTitle,
      salary: this.state.salary,
      jobDescription: this.state.jobDescription,
    };
    this.addJob(Job)
    this.setState({
      jobTitle: '',
      salary: '',
      jobDescription: ''
    })
  }

  componentWillMount() {
    const uid = firebaseAuth().currentUser.uid
    this.ref = base.syncState(`/users/${uid}/postedJobs`, {
      context: this,
      state: 'postedJobs'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  render(){
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <ControlLabel>
          <h2>Please Enter job details</h2>
        </ControlLabel>
        <FormGroup>
          <ControlLabel>Job Title</ControlLabel>
          <FormControl
            required
            type='text'
            value={this.state.jobTitle}
            name='jobTitle'
            id='inputJob'
            placeholder='Job Title'
            onChange={this.handleChange}
          />
          <ControlLabel>Salary</ControlLabel>
          <FormControl
            required
            type='number'
            value={this.state.salary}
            name='salary'
            id='inputSalary'
            placeholder='Salary'
            onChange={this.handleChange}
          />
          <ControlLabel>Job Description</ControlLabel>
          <FormControl
            required
            componentClass='textarea'
            value={this.state.jobDescription}
            name='jobDescription'
            id='inputDescription'
            placeholder='Job description'
            onChange={this.handleChange}
          />
          <Button block bsStyle='primary' bsSize='lg' type='submit'>Submit</Button>
        </FormGroup>
      </form>
    )
  }
}

