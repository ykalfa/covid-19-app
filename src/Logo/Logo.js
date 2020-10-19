import React from 'react'

import './Logo.css'

function Logo() {
    return (
        <div>
            <img src={process.env.PUBLIC_URL + '/covidLogo2.png'} alt="logo" /> 
        </div>
    )
}
export default Logo