import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinner'
import { Redirect } from 'react-router-dom'
import { ref, firebaseAuth } from '../../config/constants'
import './dashboard.css'

export const Dashboard = (props) => {
  return (
    props.isAdmin
    ?
    <Redirect to='/dashboard/admin/studentlist' />
    :
    props.isStudent
    ?
    <Redirect to='/dashboard/student/details' />
    :
    props.isCompany
    ?
    <Redirect to='/dashboard/company/postjobs' />
    :
    <Spinner />
  )
}
