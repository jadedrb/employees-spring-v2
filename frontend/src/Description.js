import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const Description = (props) => {

    const history = useHistory()
    let pathEnd = history.location.pathname.split('/')[2]
    
    let profile = props.profiles.filter(p => p.employee === pathEnd)[0]
    let description = JSON.parse(profile?.description)

    console.log(profile)
    console.log(description)

    return (
        <>
            <Link className='link' to='/'>Back</Link>
            <div className='d-page'>
                <h1>{profile.employee}</h1>
                <img src={description.large} className='large' />
                <ol>
                    <li>GENDER</li>
                    <li>{description.gender}</li>
                    <li>STATE</li>
                    <li>{description.state}</li>
                    <li>CITY</li>
                    <li>{description.city}</li>
                    <li>STREET</li>
                    <li>{description.street}</li>
                    <li>CELL</li>
                    <li>{description.cell}</li>
                </ol>
            </div>
        </>
    )
}

export default Description;