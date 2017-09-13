import React, { Component } from 'react'
import { SideBar } from '../SideBar'
import { Grid, Row } from 'react-bootstrap'
import profilePhoto from '../../../images/admin-icon.png'


export const AdminDashboard = (props) => {
    return (
      <Grid fluid>
        <Row>
          <SideBar
            userTitle='Admin Dashboard'
            image={profilePhoto}
            name='Admin'
            list={[
              {title: 'View All Students', link: '/dashboard/admin/studentlist'},
              {title: 'View All jobs', link: '/dashboard/admin/joblist'},
              {title: 'View All Companies', link: '/dashboard/admin/companylist'}
            ]}
          />
          {props.section}
        </Row>
      </Grid>
    )
  }
