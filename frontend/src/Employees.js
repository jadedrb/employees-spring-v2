import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Employees = (props) => {
    const history = useHistory()

    const updateEmployeeDetails = id => history.push(`/employees/${id}`)

    let employees = props.employees.map(emp => {
        return (
            <ul key={emp.id}>
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

    return (
        <div>
            <Link className='link' to='/employees'>ADD EMPLOYEE</Link><br/>
            <h1>List of Employees</h1>
            {employees}
        </div>
    )
}

export default Employees;
