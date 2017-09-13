import React from 'react'
import { Col, Panel, Table } from 'react-bootstrap'

export const ViewCompany = (props) => {
  const { accounts } = props
  const displayAccounts = Object.keys(accounts).filter(key => {
    return accounts[key].info.type === 'company'
  }).map(key => {
    return (
      <tr key={key}>
        <th>{accounts[key].info.name}</th>
        <td>{accounts[key].info.email}</td>
      </tr>
    )
  })
  return (
    <Col xs={12} sm={9} lg={10}>
      <Panel header='All the Companies' bsStyle='primary'>
        <Table striped responsive hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
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

