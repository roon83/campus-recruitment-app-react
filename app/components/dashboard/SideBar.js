import React from 'react'
import PropTypes from 'prop-types'
import { Col, Image, NavItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './dashboard.css'

export const SideBar = (props) => {
  return (
    <Col xs={12} sm={3} lg={2}>
      <h3>{props.userTitle}</h3><br />
      <Image src={props.image} circle responsive />
      <h4>{props.name}</h4>
      <ul className='nav nav-pills nav-stacked'>
        {
          props.list.map( (item) => {
            return (
              <LinkContainer key={item.title} to={item.link}>
                <NavItem>
                  <i className='fa fa-list-alt fa-fw'></i>{item.title}
                </NavItem>
              </LinkContainer>
            )
          }
          )}
        </ul>
      </Col>
  )
}

SideBar.propTypes = {
  list: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  userTitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}
