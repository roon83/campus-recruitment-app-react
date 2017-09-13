import React, { Component } from 'react'
import { Col, Panel, Table, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const JobList = (props) => {
  const { accounts } = props
  const jobs = Object.keys(accounts).filter(key => {
    return (
      accounts[key].postedJobs
    )
  }).map(key => {
    return (
      Object.keys(accounts[key].postedJobs).map(job => {
        return (
          <tr>
            <th>{accounts[key].postedJobs[job].jobTitle}</th>
            <td>{accounts[key].postedJobs[job].salary}</td>
            <td>{accounts[key].postedJobs[job].jobDescription}</td>
            <td><Button bsStyle="danger" onClick={() => props.removeJob(key, job)}>Remove Job</Button></td>
          </tr>
        )
      })
    )
  })
  return (
    <Col xs={12} sm={9} lg={10}>
      <Panel header="Posted Jobs" bsStyle="primary">
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Salary</th>
              <th>Job Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs}
          </tbody>
        </Table>
      </Panel>
    </Col>
  )
}

