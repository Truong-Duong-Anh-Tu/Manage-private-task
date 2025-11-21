import React from 'react'
import './style.css'
import Taskbar from '../../components/Taskbar/taskbar'
import Content from '../../components/Content/content'

function Setting() {
    return (
        <div className='settingpage'>
            <Taskbar />
            <Content>
                <div className='section-setting'>
                    <p>Đây là trang setting.</p>
                </div>
            </Content>
        </div>
    )
}

export default Setting

// interface FromDataEmployee {
//     fullName: string;
//     phone: string;
//     email: string;
//     citizenId: string; // Căn cước công dân
//     taxCode: string; // Mã số thuế
//     address: string;
//     gender: string;
//     bankAccount: {
//         accountNumber: string;
//         bankName: string;
//         accountHolder: string;
//     };
//     avatar: string;
// }