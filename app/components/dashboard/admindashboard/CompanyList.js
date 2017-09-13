import React, { Component } from 'react'
import { Col, Panel, Table, ButtonToolbar, Button, Modal, FormGroup, FormControl } from 'react-bootstrap'

export default class CompanyList extends Component {
  state = {
    activeModal: null,
    details: false
  }

  showModal = (key, index) => {
    return (
      this.setState({
        activeModal: index,
      })
    )
  }

  hideModal = () => this.setState({ activeModal: null, details: false })

  viewDetails = () => this.setState({ details: true })

  hideDetails = () => this.setState({ details: false })

  render() {
    const { accounts } = this.props
    const displayAccounts = Object.keys(accounts).filter(key => {
      return accounts[key].info.type === 'company'
    }).map((key, index) => {
      return (
        <tr key={key}>
          <th>{accounts[key].info.name}</th>
          <td>{accounts[key].info.email}</td>
          <td><Button bsStyle='danger' onClick={() => this.props.removeAccount(key)}>Remove Account</Button></td>
          <td>
            <ButtonToolbar>
              <Button id={key} bsStyle="primary" onClick={() => this.showModal(key, index)}>View Details</Button>
              {!this.state.details
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
                            <td>{accounts[key].info.name}</td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>{accounts[key].info.email}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle='primary' onClick={this.viewDetails}>Jobs by this company</Button>
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
                      <Modal.Title>Company Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Table responsive striped hover>
                        <thead>
                          <tr>
                            <th>Job Title</th>
                            <th>Salary</th>
                            <th>Description</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            (accounts[key].postedJobs) &&
                            Object.keys(accounts[key].postedJobs).map((job) => {
                              return (
                                <tr key={job}>
                                  <th>{accounts[key].postedJobs[job].jobTitle}</th>
                                  <td>{accounts[key].postedJobs[job].salary}</td>
                                  <td>{accounts[key].postedJobs[job].jobDescription}</td>
                                  <td><Button onClick={() => this.props.removeJob(key, job)} bsStyle='danger'>Remove Job</Button></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle='primary' onClick={this.hideDetails}>Back</Button>
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
        <Panel header='All the Companies' bsStyle='primary'>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
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

