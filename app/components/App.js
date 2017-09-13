import React, { Component } from 'react'
import Spinner from 'react-spinner'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { logout } from '../helpers/auth'
import { firebaseAuth, ref, base } from '../config/constants'
import { PublicRoute, PrivateRoute } from './routes'
import { NavBar } from './navbar/NavBar'
import SignIn from './signin/SignIn'
import SignUp from './signup/SignUp'
import { Dashboard } from './dashboard/dashboard'
import { AdminDashboard } from './dashboard/admindashboard/AdminDashboard'
import CompanyList from './dashboard/admindashboard/CompanyList'
import { JobList } from './dashboard/admindashboard/JobList'
import StudentsList from './dashboard/admindashboard/StudentList'
import { StudentDashboard } from './dashboard/studentdashboard/StudentDashboard'
import StudentDetails from './dashboard/studentdashboard/StudentDetails'
import { ViewJobs } from './dashboard/studentdashboard/ViewJobs'
import { ViewCompany } from './dashboard/studentdashboard/ViewCompany'
import { CompanyDashboard } from './dashboard/companydashboard/CompanyDashboard'
import PostJobs from './dashboard/companydashboard/PostJobs'
import PostedJobs from './dashboard/companydashboard/PostedJobs'
import { StudentList } from './dashboard/companydashboard/StudentList'
import { Home } from './home/Home'

export default class App extends Component {
constructor(props) {
  super(props)
    this.state = {
      details: null,
      isAdmin: false,
      isStudent: false,
      isCompany: false,
      authed: false,
      loading: true,
      dataExist: false,
      accounts: {}
    }
  }

  removeJob = (account, job) => {
    const accounts = {...this.state.accounts}
    accounts[account].postedJobs[job] = null
    this.setState({ accounts })
  }

  updateAccountDetails = (account, details) => {
    const accounts = {...this.state.accounts}
    accounts[account].userDetails = details
    this.setState({ accounts })
  }

  removeAccount = (account) => {
    const accounts = {...this.state.accounts}
    accounts[account] = null
    this.setState({ accounts })
  }

  logOut = () => {
    logout();
    this.setState({
      isAdmin: false,
      isStudent: false,
      isCompany: false,
      dataExist: false,
      accounts: {}
    })
  }

  componentWillMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const uid = firebaseAuth().currentUser.uid
        ref.child(`users/${uid}/info`).on('value', snap => {
          this.setState({
            details: snap.val(),
            authed: true,
            loading: false
          })
        })
        ref.child(`users/${uid}/info/type`).on('value', snap => {
          this.setState({
            isStudent: snap.val() === 'student',
            isAdmin: snap.val() === 'admin',
            isCompany: snap.val() === 'company'
          })
        })
        ref.child(`users/${uid}`).on('value', snap => {
          this.setState({
            dataExist: snap.hasChild('userDetails')
          })
        })
        this.ref = base.syncState(`/users`, {
          context: this,
          state: 'accounts'
        })
      }
      else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
    base.removeBinding(this.ref)
  }

  render(){
    const { loading, authed, isAdmin, isStudent, isCompany, accounts, details, userDetails, dataExist, postedJobs } = this.state
    return this.state.loading === true ? <Spinner /> : (
      <BrowserRouter>
        <div>
          <NavBar
            logOut={this.logOut}
            authed={authed} />
          <Switch>
            <Route path='/' exact component={() => <Home authed={authed} />} />
            <PublicRoute
              authed={authed}
              path='/signin'
              component={SignIn}
            />
            <PublicRoute
              authed={authed}
              path='/signup'
              component={SignUp}
            />
            <PrivateRoute
              exact
              authed={authed}
              path='/dashboard'
              component={() => <Dashboard
                isAdmin={isAdmin}
                isStudent={isStudent}
                isCompany={isCompany}
                loading={loading} />}
            />
            <PrivateRoute
              exact
              authed={authed}
              path='/dashboard/admin'
              component={AdminDashboard}
            />
            <PrivateRoute
              exact
              authed={authed}
              path='/dashboard/admin/studentlist'
              component={() => <AdminDashboard
                section={<StudentsList
                  accounts={accounts}
                  updateAccountDetails={this.updateAccountDetails}
                  removeAccount={this.removeAccount} />}
              />}
            />
            <PrivateRoute
              exact
              authed={authed}
              path='/dashboard/admin/joblist'
              component={() => <AdminDashboard
                section={<JobList
                  removeJob={this.removeJob}
                  accounts={accounts}/>}
              />}
            />
            <PrivateRoute
              exact
              authed={authed}
              path='/dashboard/admin/companylist'
              component={() => <AdminDashboard
                section={<CompanyList
                  accounts={accounts}
                  removeJob={this.removeJob}
                  removeAccount={this.removeAccount} />}
              />}
            />
            <PrivateRoute
              exact
              authed={authed}
              path='/dashboard/student'
              component={() => <StudentDashboard
                name={details.name} />}
            />
            <PrivateRoute
              authed={authed}
              path='/dashboard/student/details'
              component={() => <StudentDashboard
                name={details.name}
                section={<StudentDetails
                  userDetails={userDetails}
                  addStudentDetails={this.addStudentDetails}
                  dataExist={dataExist} />} />}
            />
            <PrivateRoute
              authed={authed}
              path='/dashboard/student/viewjobs'
              component={() => <StudentDashboard
                name={details.name}
                section={<ViewJobs
                  accounts={accounts}/>} />}
            />
            <PrivateRoute
              authed={authed}
              path='/dashboard/student/viewcompany'
              component={() => <StudentDashboard
                name={details.name}
                section={<ViewCompany
                  accounts={accounts} />} />}
            />
            <PrivateRoute
              exact
              authed={authed}
              path='/dashboard/company'
              component={() => <CompanyDashboard
                name={details.name} />}
            />
            <PrivateRoute
              authed={authed}
              path='/dashboard/company/postjobs'
              component={() => <CompanyDashboard
                name={details.name}
                section={<PostJobs
                  addJob={this.addJob}/>} />}
            />
            <PrivateRoute
              authed={authed}
              path='/dashboard/company/postedjobs'
              component={() => <CompanyDashboard
                name={details.name}
                section={<PostedJobs
                  removeJob={this.removeJob}
                  postedJobs={postedJobs} />} />}
            />
            <PrivateRoute
              authed={authed}
              path='/dashboard/company/studentlist'
              component={() => <CompanyDashboard
                name={details.name}
                section={<StudentList
                  accounts={accounts}/>} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
