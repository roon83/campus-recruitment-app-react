import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './navbar.css'
import { Navbar, Grid, Nav, Button, NavItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const NavBar = (props) => {
  return (
    <Navbar role='navigation' fixedTop fluid >
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink exact to='/'>
            Campus Recruiter
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {!props.authed ?
            (<ul className='navbar-nav nav navbar-right'>
              <li className='hover'>
                <NavLink exact activeClassName='active' to='/signin'>
                  Sign in
                </NavLink>
              </li>
              <li className='hover'>
                <NavLink activeClassName='active' to='/signup'>
                  Sign up
                </NavLink>
              </li>
            </ul>) : (
              <ul className='navbar-nav nav navbar-right'>
                <li className='hover'>
                  <NavLink activeClassName='active' to='/dashboard'>
                    Dashboard
                  </NavLink>
                </li>
                <NavItem onClick={props.logOut} >
                  Sign out
                </NavItem>
              </ul>
            )
        }
      </Navbar.Collapse>
    </Navbar>
  )
}
