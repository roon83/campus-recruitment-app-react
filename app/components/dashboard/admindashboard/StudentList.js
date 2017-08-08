import React, { Component } from 'react';
import { Col, Panel, Table, ButtonToolbar, Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

export default class StudentsList extends Component {
  state = {
    activeModal: null,
    userDetails: null,
    name: '',
    education: '',
    gpa: '',
    skills: '',
    overview: '',
    editing: false
  }

  showModal = (e, key, index) => {
    return (
      this.setState({
        activeModal: index,
        name: this.props.accounts[key].userDetails.name,
        education: this.props.accounts[key].userDetails.education,
        gpa: this.props.accounts[key].userDetails.gpa,
        skills: this.props.accounts[key].userDetails.skills,
        overview: this.props.accounts[key].userDetails.overview
      })
    )
  }

  hideModal = () => this.setState({activeModal: null, editing: false})

  editDetails = () => this.setState({ editing: true })

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit = (e, key) => {
    e.preventDefault();
    const userDetails = {
      name: this.state.name,
      education: this.state.education,
      gpa: this.state.gpa,
      skills: this.state.skills,
      overview: this.state.overview
    }
    this.props.updateAccountDetails(key, userDetails)
    this.setState({ editing: false })
  }

  render() {
    const { accounts } = this.props;
    const displayAccounts = Object.keys(accounts).filter(key => {
      return accounts[key].info.type === 'student'
    }).map((key, index) => {
      return (
        <tr key={key}>
          <th>{accounts[key].info.name}</th>
          <td>{accounts[key].info.email}</td>
          <td><Button bsStyle='danger' onClick={() => this.props.removeAccount(key)}>Remove Account</Button></td>
          <td>
            <ButtonToolbar>
              <Button id={key} bsStyle="primary" onClick={(e) => this.showModal(e, key, index)}>View Details</Button>
              {!this.state.editing
                  ?
                  <Modal
                    id={key}
                    show={this.state.activeModal === index}
                    onHide={this.hideModal}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Student Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            <td>{accounts[key].userDetails.name}</td>
                          </tr>
                          <tr>
                            <th>Education</th>
                            <td>{accounts[key].userDetails.education}</td>
                          </tr>
                          <tr>
                            <th>GPA</th>
                            <td>{accounts[key].userDetails.gpa}</td>
                          </tr>
                          <tr>
                            <th>Skills</th>
                            <td>{accounts[key].userDetails.skills}</td>
                          </tr>
                          <tr>
                            <th>Overview</th>
                            <td>{accounts[key].userDetails.overview}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle='primary' onClick={this.editDetails}>Edit Details</Button>
                      <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                  :
                  <Modal
                    id={key}
                    show={this.state.activeModal === index}
                    onHide={this.hideModal}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Student Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={(e) => this.handleSubmit(e, key)}>
                        <FormGroup>
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
                                <td><FormControl name='name' type='text' value={this.state.name} id='inputName' onChange={this.handleChange} /></td>
                              </tr>
                              <tr>
                                <th>Education</th>
                                <td><FormControl name='education' type='text' value={this.state.education} id='inputEducation' onChange={this.handleChange} /></td>
                              </tr>
                              <tr>
                                <th>GPA</th>
                                <td><FormControl name='gpa' type='text' value={this.state.gpa} id='inputGpa' onChange={this.handleChange} /></td>
                              </tr>
                              <tr>
                                <th>Skills</th>
                                <td><FormControl name='skills' type='text' value={this.state.skills} id='inputSkill' onChange={this.handleChange} /></td>
                              </tr>
                              <tr>
                                <th>Overview</th>
                                <td><FormControl name='overview' type='text' value={this.state.overview} id='inputOverview' onChange={this.handleChange} /></td>
                              </tr>
                              <tr>
                                <td><Button bsStyle='primary' type='submit'>Save</Button></td>
                              </tr>
                            </tbody>
                          </Table>
                        </FormGroup>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                  </Modal>}
                </ButtonToolbar>
              </td>
            </tr>
      )
    })
    return (
      <Col xs={12} sm={9} lg={10}>
        <Panel header='All the Students' bsStyle='primary'>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayAccounts}
            </tbody>
          </Table>
        </Panel>
      </Col>
    )
  }
}

