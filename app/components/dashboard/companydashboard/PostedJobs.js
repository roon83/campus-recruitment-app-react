import React, { Component } from 'react'
import { Col, Panel, Table, Button } from 'react-bootstrap'
import { firebaseAuth, base } from '../../../config/constants'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class PostedJobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postedJobs: null
    }
  }

  removeJob = (job) => {
    const postedJobs = {...this.state.postedJobs}
    postedJobs[job] = null
    this.setState({ postedJobs })
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

  render() {
    const { postedJobs } = this.state
    const jobList = Object.keys(postedJobs).map(key => {
      return (
        <tr key={key}>
          <th>{postedJobs[key].jobTitle}</th>
          <td>{postedJobs[key].salary}</td>
          <td>{postedJobs[key].jobDescription}</td>
          <td><Button bsStyle='danger' onClick={() => this.removeJob(key)}>Remove Job</Button></td>
        </tr>
      )
    })
    return (
      <Col xs={12} sm={9} lg={10}>
        <Panel header="Posted Jobs" bsStyle="primary">
          <Table responsive striped condensed hover>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Salary</th>
                <th>Job Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobList}
            </tbody>
          </Table>
        </Panel>
      </Col>
    )
  }
}

