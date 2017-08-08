import React, { Component } from 'react';
import { Col, Panel, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ViewJobs = (props) => {
  const { accounts } = props;
  const jobs = Object.keys(accounts).filter(key => {
    return (
      accounts[key].postedJobs
    )
  }).map(key => {
    return (
      accounts[key].postedJobs
    )
  }).map(key => {
    return (
      Object.values(key).map(key => {
        return (
          <tr>
            <th>{key.jobTitle}</th>
            <td>{key.salary}</td>
            <td>{key.jobDescription}</td>
            <td></td>
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

