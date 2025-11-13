import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import Logo from '../../assets/Logo-Photoroom.png';

function Taskbar() {
    return (
        <div className='taskbar'>
            <img src={Logo} alt='logo' className='logo' />
            <nav className='selections'>
                <NavLink to='/' end>Tổng quan</NavLink>
                <NavLink to='/tasks'>Danh sách nhiệm vụ</NavLink>
                <NavLink to='/tasks'>Cài đặt</NavLink>
            </nav>
        </div>
    )
}

export default Taskbar