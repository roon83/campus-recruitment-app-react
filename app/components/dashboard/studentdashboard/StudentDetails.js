import React, { Component } from 'react';
import { Col, Panel, Grid, ControlLabel, FormControl, FormGroup, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firebaseAuth, base } from '../../../config/constants'
import './studentdetails.css'

export default class StudentDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      education: '',
      gpa: '',
      skills: '',
      overview: '',
      userDetails: null
    }
  }

  componentWillMount() {
    const uid = firebaseAuth().currentUser.uid;
    this.ref = base.syncState(`users/${uid}/userDetails`, {
      context: this,
      state: 'userDetails'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addStudentDetails = (details) => {
    this.setState({ userDetails: details })
  }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name: this.state.name,
      education: this.state.education,
      gpa: this.state.gpa,
      skills: this.state.skills,
      overview: this.state.overview,
    }
    this.addStudentDetails(userDetails)
  }

  render(){
    return this.props.dataExist ? (
      <Col xs={12} sm={9} lg={10}>
        <Panel header='User Details' bsStyle='primary'>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{this.state.userDetails.name}</td>
              </tr>
              <tr>
                <th>Education</th>
                <td>{this.state.userDetails.education}</td>
              </tr>
              <tr>
                <th>GPA</th>
                <td>{this.state.userDetails.gpa}</td>
              </tr>
              <tr>
                <th>Skills</th>
                <td>{this.state.userDetails.skills}</td>
              </tr>
              <tr>
                <th>Overview</th>
                <td>{this.state.userDetails.overview}</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
      </Col>
    ) : (
      <form onSubmit={this.handleSubmit} className='form-signin'>
        <ControlLabel><h2>Please complete your profile</h2></ControlLabel>
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
          <ControlLabel>Education</ControlLabel>
          <FormControl
            required
            type='text'
            value={this.state.education}
            name='education'
            id='inputEducation'
            placeholder='Your Education'
            onChange={this.handleChange}
          />
          <ControlLabel>GPA</ControlLabel>
          <FormControl
            required
            type='text'
            value={this.state.gpa}
            name='gpa'
            id='inputGpa'
            placeholder='Your GPA'
            onChange={this.handleChange}
          />
          <ControlLabel>Skills</ControlLabel>
          <FormControl
            required
            type='text'
            value={this.state.skills}
            name='skills'
            id='inputSkills'
            placeholder='Skills'
            onChange={this.handleChange}
          />
          <ControlLabel>Overview</ControlLabel>
          <FormControl
            required
            componentClass='textarea'
            value={this.state.overview}
            name='overview'
            id='inputOverview'
            placeholder='Overview'
            onChange={this.handleChange}
          />
          <Button block bsStyle='primary' bsSize='lg' type='submit'>Submit</Button>
        </FormGroup>
      </form>
    )
  }
}

