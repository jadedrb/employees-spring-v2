import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CreateUpdateEmp from './CreateUpdateEmp';
import Employees from './Employees';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()
    this.state = {
      employees: [],
      loading: false,
      interval: false,
      dots: ''
    }
  }

  componentDidMount() { 
    // This app runs with the Employee2020 Java/Spring Boot server
  
    console.log('v1.10')
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
      let response = await axios.get('/api/employees')
      this.setState({ employees: response.data })
      console.log('new version: ')
      console.log(response.data)
    }
    catch (err) {
      console.log('error occured')
    }
    finally {
      this.loadingFunc()
    }
  }

  deleteEmployee = async (id) => {
    console.log('delete')
    this.loadingFunc()
    try {
      let response = await axios.delete(`/api/employees/${id}`)
      this.getEmployees()
      console.log(response)
    }
    catch (err) {
      console.log('error occured')
      console.log(err)
    }
    finally {
      this.loadingFunc()
    }
  }

  updateEmployee = async (employee, id) => {
    console.log('update')
    this.loadingFunc()
    try {
      let response = await axios.put(`/api/employees/${id}`, employee)
      console.log(response)
      this.getEmployees()
    } 
    catch (err) {
      console.log('failed update')
    }
    finally {
      this.loadingFunc()
    }
  }

  addNewEmployee = async (employee) => {
    console.log('create')
    this.loadingFunc()
    try {
      let response = await axios.post('/api/employees', employee)
      console.log(response)
      this.getEmployees()
    } 
    catch (err) {
      console.log('failed create')
    }
    finally {
      this.loadingFunc()
    }
  }

  render() {

    let { loading, dots } = this.state 
    let loadStyle = loading ? { display: 'block' } : { display: 'none' }

    return (
      <>
        <div className="loading dissappear" style={loadStyle}>loading{dots}</div>
        <Router>
          <Switch>
            <Route path='/employees' render={() => <CreateUpdateEmp 
                                                      updateEmployee={this.updateEmployee}
                                                      addNewEmployee={this.addNewEmployee}/>} />
            <Route path='/' render={() => <Employees 
                                              employees={this.state.employees} 
                                              deleteEmployee={this.deleteEmployee}/>} />
          </Switch>
        </Router>
      </>
     );
  }
}

export default App;
