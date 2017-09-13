import React, { Component } from 'react'
import { SideBar } from '../SideBar'
import { Grid, Row } from 'react-bootstrap'
import placeholderImage from '../../../images/profile-placeholder.png'

export const CompanyDashboard = (props) => {
  const name = props.name
  return (
    <Grid fluid>
      <Row>
        <SideBar
          userTitle='Company Profile'
          image={placeholderImage}
          name={name}
          list={[
            {title:'Post jobs', link: '/dashboard/company/postjobs'},
            {title: 'My posted jobs', link: '/dashboard/company/postedjobs'},
            {title:'Students', link: '/dashboard/company/studentlist'}
          ]}
        />
        {props.section}
      </Row>
    </Grid>
  )
}
