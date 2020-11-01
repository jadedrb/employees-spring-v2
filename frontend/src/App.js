import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import CreateUpdateEmp from './CreateUpdateEmp';
import Employees from './Employees';
import Login from './Login';

import { readData, createData, deleteData, updateData, readDataOfId } from './ApiCalls';
import axios from 'axios';
import Description from './Description';


class App extends Component {

  constructor() {
    super()
    this.state = {
      profiles: [],
      companies: [],
      employees: [],
      loading: false,
      interval: false,
      dots: '',
      company: ''
    }
  }

  componentDidMount() { 
    let company = sessionStorage.getItem('company')
    if (company) this.setState({ company }) 
    console.log(company)
    console.log('v1.11')
    this.getEmployees() 
  }

  loadingFunc = () => {

    let dotsInterval = false

    if (!this.state.loading) {
      dotsInterval = setInterval(() => {
        if (this.state.dots.length < 3) {
          this.setState(state => {
            return {
              dots: state.dots + '.'
            }
          })
        } 
        else this.setState({ dots: '' })
      }, 100)
    } else clearInterval(this.state.interval)

    this.setState({ loading: !this.state.loading, interval: dotsInterval })

  }

  getEmployees = async () => {
    this.loadingFunc()
    try {
      let employees = await readData('/api/employees')
      let profiles = await readData('/api/profiles')
      let admin = sessionStorage.getItem('company') === 'admin'
      let companies = []
      if (admin) {
        companies = await readData('/api/companys')
      }
      else employees = employees.filter(c => c.companyName === this.state.company)
      this.setState({ employees, companies, profiles })
    } 
    catch (err) { console.log(err) }
    finally { 
      this.loadingFunc() 
      this.removeAnyFloatingProfiles()
    }
  }

  deleteEmployee = async (id) => {
    this.loadingFunc()
    try {
      await deleteData(`/api/employees/`, id)
      this.getEmployees()
    } 
    catch (err) { console.log(err) }
    finally { this.loadingFunc() }
  }

  updateEmployee = async (employee, id) => {
    this.loadingFunc()
    try {

      // determine if corresponding profile model needs to be changed too
      let oldEmployee = await readDataOfId('/api/employees/', id)
      if (oldEmployee.firstName !== employee.firstName) {
        let profile = this.state.profiles.filter(p => p.employee === oldEmployee.firstName)[0]
        await updateData('/api/profiles/', profile.id, { ...profile, employee: employee.firstName})
      }
      
      await updateData(`/api/employees/`, id, employee)
      this.getEmployees()
    } 
    catch (err) { console.log(err) }
    finally { this.loadingFunc() }
  }

  addNewEmployee = async (employee) => {
    this.loadingFunc()
    try {
      await createData('/api/employees', employee)
      let profile = await this.createRandomProfileDetails(employee.firstName)
      await createData('/api/profiles', profile)
      this.getEmployees()
    } 
    catch (err) { console.log(err) }
    finally { this.loadingFunc() }
  }

  createRandomProfileDetails = async (employee) => {
    try {
      let cors = 'https://cors-anywhere.herokuapp.com/'
      let picture = await axios.get(cors + 'https://randomuser.me/api/')

      console.log(picture)

      let description = {
        gender: picture.data.results[0].gender,
        street: `${picture.data.results[0].location.street.number} ${picture.data.results[0].location.street.name}`,
        city: picture.data.results[0].location.city,
        state: picture.data.results[0].location.state,
        cell: picture.data.results[0].cell,
        age: picture.data.results[0].dob.age,
        large: picture.data.results[0].picture.large
      }

      description = JSON.stringify(description)

      picture = picture.data.results[0].picture.medium

      let profile = {
        description,
        picture,
        employee
      }

      return profile
    } 
    catch (err) { return '' }
  }

  changeCompanyName = company => this.setState({ company })
  resetEmployeesArr = () => this.setState({ employees: [] })

  removeAnyFloatingProfiles = () => {
    // aka the "because i'm lazy" function
    let { profiles, employees } = this.state
    console.log(this.state)
    profiles.forEach(p => employees.filter(e => e.firstName === p.employee).length ? null : deleteData(`/api/profiles/`, p.id))
  }

  render() {

    let { loading, dots } = this.state 
    let loadStyle = loading ? { display: 'block' } : { display: 'none' }

    let determineLogin = this.state.company && sessionStorage.getItem('company') ? true : false
    let redirectToLogin = determineLogin? <Redirect from='/login' to='/' /> : <Redirect from='/' to='/login' />

    return (
      <>
        <div className="loading dissappear" style={loadStyle}>loading{dots}</div>
        <Router>
          {redirectToLogin}
          <Switch>
            <Route path='/descriptions' render={() => <Description profiles={this.state.profiles} />} />
            <Route path='/login' render={() => <Login 
                                                  changeCompanyName={this.changeCompanyName} 
                                                  getEmployees={this.getEmployees }/>} />
            <Route path='/employees' render={() => <CreateUpdateEmp 
                                                      updateEmployee={this.updateEmployee}
                                                      addNewEmployee={this.addNewEmployee}
                                                      companyName={this.state.companyName} />} />
            <Route path='/' render={() => <Employees 
                                              employees={this.state.employees} 
                                              companies={this.state.companies} 
                                              profiles={this.state.profiles} 
                                              getEmployees={this.getEmployees}
                                              deleteEmployee={this.deleteEmployee}
                                              changeCompanyName={this.changeCompanyName} 
                                              resetEmployeesArr={this.resetEmployeesArr} />} />
          </Switch>
        </Router>
      </>
     );
  }
}

export default App;
