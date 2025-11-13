import React from 'react'
import './style.css'


function Content({ children }) {

    return (
        <div className='content'>
            {children}
        </div>
    )
}

export default Content