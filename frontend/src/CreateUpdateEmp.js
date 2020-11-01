import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateUpdateEmp = (props) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const location = useLocation()
    const history = useHistory()

    let pathEnd = location.pathname.split('/')[2]
    let creation = isNaN(pathEnd) ? true : false

    let header = creation ? 'Add a New Employee' : `Update Details for Employee #${pathEnd}`

    useEffect(() => {
        if (!creation) getEmployeeById(pathEnd)
    }, [])

    const getEmployeeById = async (id) => {
        console.log(id)
        try {
            let response = await axios.get(`/api/employees/${id}`)

            // This mapping is to turn any 'null' properties into empty strings (because React)
            Object.keys(response.data).map(property => !response.data[property] ? response.data[property] = '' : response.data[property])

            let { firstName, lastName, email, jobTitle } = response.data

            setFirstName(firstName)
            setLastName(lastName)
            setEmail(email)
            setJobTitle(jobTitle)
            console.log(response.data)
        } catch (err) { }
    }

    const handleChange = e => {
    
        let { id, value } = e.target

        switch (id) {
            case 'first':
                setFirstName(value)
                break;
            case 'last':
                setLastName(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'title':
                setJobTitle(value)
                break;
            default:
                break;
        }

        console.log(id)
    }

    const handleSubmit = e => {
        e.preventDefault()

        let companyName = sessionStorage.getItem('company')

        let employeeObj = {
            firstName,
            lastName,
            email,
            jobTitle,
            companyName
        }

        console.log(employeeObj)

        creation ? props.addNewEmployee(employeeObj) : props.updateEmployee(employeeObj, pathEnd)
        history.push('/')
    }

    return (
        <>
            <Link className='link' to='/'>Back</Link>
            <h1>{header}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first">First Name</label>
                <input id="first" value={firstName} onChange={handleChange} />

                <label htmlFor="last">Last Name</label>
                <input id="last" value={lastName} onChange={handleChange}/>

                <label htmlFor="email">Email</label>
                <input id="email" value={email} onChange={handleChange}/>

                <label htmlFor="title">Title</label>
                <input id="title" value={jobTitle} onChange={handleChange}/>

                <button>{creation ? 'ADD' : 'UPDATE'}</button>
            </form>
        </>
    )
}

export default CreateUpdateEmp;