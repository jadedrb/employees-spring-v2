import React, { Component } from 'react';
import { readData, createData } from './ApiCalls';

class Login extends Component {

    state = {
        companyName: '',
        password: ''
    }

    handleChange = e => this.setState({ [e.target.name] : e.target.value })

    finishLogin = () => {
        console.log('finishing login')
        sessionStorage.setItem('company', this.state.companyName)
        this.props.changeCompanyName(this.state.companyName)
        this.props.getEmployees()
    }

    handleSubmit = async e => {
  
        e.preventDefault()
        console.log(this.state)

        try {

            // admin privledges
            let admin = this.state.companyName === 'admin'
            let password = this.state.password === 'admin'

            if (admin) {
                if (password) {
                    this.finishLogin()
                    return
                }
                else {
                    alert('Incorrect password!')
                    return
                }
            }

            // regular user
            let companies = await readData('/api/companys')
            let result = companies.some(c => c.companyName === this.state.companyName)
            console.log(companies)

            // if there is no company with that name, create one
            if (!result) {
                createData('/api/companys', this.state)
                this.finishLogin()
            }
            else {
                let password = companies.some(c => c.companyName === this.state.companyName && c.password === this.state.password)
                //  if the password doesn't fit, then alert
                if (!password) alert('Incorrect password!')
                else this.finishLogin()
            }
        } catch (err) { console.log(err) }

    }

    render() {
        return (
            <>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="company">Company Name</label>
                <input 
                    value={this.state.companyName} 
                    onChange={this.handleChange} 
                    name='companyName'
                    id='company'
                    autoComplete='company-name'
                    required />
                <label htmlFor="password">Password</label>
                <input 
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    name='password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    required />
                <button>Login</button>
            </form>
            </>
        )
    }
}

export default Login;