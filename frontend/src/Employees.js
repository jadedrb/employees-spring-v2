import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteData } from './ApiCalls';
import Description from './Description';

const Employees = (props) => {
    const history = useHistory()

    const updateEmployeeDetails = id => history.push(`/employees/${id}`)

    const descriptionPage = name => history.push(`/descriptions/${name}`)

    const deleteCompanyAndRefresh = async (id, company) => {
        try {
        await deleteData('/api/companys/', id)
        let emps = props.employees.filter(emp => emp.companyName === company)
        await Promise.all(emps.map(e => deleteData('/api/employees/', e.id)))
        props.getEmployees()
        } 
        catch(err) { 
            console.log(err) 
        }
    }

    const logoutUser = () => {
        props.changeCompanyName('')
        sessionStorage.clear()
        props.resetEmployeesArr()
        console.log('logoutuser')
    }

    const pictureGrab = emp => props.profiles.filter(p => p.employee === emp)[0]?.picture

    let employees = props.employees.map(emp => {
        return (
            <ul key={emp.id}>
                <img src={pictureGrab(emp.firstName)} onClick={() => descriptionPage(emp.firstName)} alt='employee'/>
                <li>
                    <span>First Name: </span>
                    {emp.firstName}
                </li>
                <li>
                    <span>Last Name: </span>
                    {emp.lastName}
                </li>
                <li>
                    <span>Email: </span>
                    {emp.email}
                </li>
                <li>
                    <span>Job Title: </span>
                    {emp.jobTitle}
                </li>
                <li className='l-button x-button' onClick={() => updateEmployeeDetails(emp.id)}>UPDATE</li>
                <li className='r-button x-button' onClick={() => props.deleteEmployee(emp.id)}>DELETE</li>
            </ul>
        )
    })

    let admin = sessionStorage.getItem('company') === 'admin'
    let adminHeader = admin ? <h2 style={{ textAlign: 'center' }}>Admin</h2> : ''
    let adminEmployeesHeader = admin ? <h3>Employees</h3> : ''
    let adminCompaniesHeader = admin ? <h3>Companies</h3> : ''

    let companies = !admin ? <></> : props.companies.map(com => {
        return (
            <ul key={com.id}>
                <li>
                    <span>Company: </span>
                    {com.companyName}
                </li>
                <li className='r-button x-button d-company' onClick={() => deleteCompanyAndRefresh(com.id, com.companyName)}>DELETE</li>
            </ul>
        )
    })


    return (
        <div>
            <Link className='link logout' to='/login' onClick={logoutUser}>LOGOUT</Link>
            <Link className='link' to='/employees'>ADD EMPLOYEE</Link><br/>
            <h1>List of Employees</h1>
            {adminHeader}
            {adminCompaniesHeader}
            {companies}
            {adminEmployeesHeader}
            {employees}
        </div>
    )
}

export default Employees;
