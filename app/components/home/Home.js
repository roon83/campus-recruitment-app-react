import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export const Home = (props) => {
  return (
    (props.authed)
    ?
    <Redirect to='/dashboard' />
    :
    <Redirect to='/signin' />
  )
}

