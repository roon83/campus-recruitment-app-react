import React, { Component } from 'react'
import { SideBar } from '../SideBar'
import { Grid, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import placeholderImage from '../../../images/profile-placeholder.png'

export const StudentDashboard = (props) => {
  const name = props.name;
  return (
    <Grid fluid>
      <Row>
        <SideBar
          userTitle='Student Profile'
          image={placeholderImage}
          name={name}
          list={[
            {title: 'Student details', link: '/dashboard/student/details'},
            {title: 'View all jobs', link: '/dashboard/student/viewjobs'},
            {title: 'View Companies', link: '/dashboard/student/viewcompany'}
          ]}
        />
        {props.section}
      </Row>
    </Grid>
  )
}
