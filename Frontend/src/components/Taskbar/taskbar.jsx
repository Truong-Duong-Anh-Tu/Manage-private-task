import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import Logo from '../../assets/Logo-Photoroom.png';

function Taskbar() {
    return (
        <div className='taskbar'>
            <img src={Logo} alt='logo' className='logo' />
            <nav className='selections'>
                <NavLink to='/' className={({ isActive }) => isActive ? 'active' : ''}>Tổng quan</NavLink>
                <NavLink to='/tasks' className={({ isActive }) => isActive ? 'active' : ''}>Danh sách nhiệm vụ</NavLink>
                <NavLink to='/setting' className={({ isActive }) => isActive ? 'active' : ''}>Cài đặt</NavLink>
            </nav>
        </div>
    )
}

export default Taskbar