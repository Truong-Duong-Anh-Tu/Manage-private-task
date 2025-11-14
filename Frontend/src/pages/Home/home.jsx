import React from 'react'
import './style.css'
import Taskbar from '../../components/Taskbar/taskbar'
import Content from '../../components/Content/content'
import Chart from '../../components/Others/Chart/chart'
import Calendar from '../../components/Others/Calendar/calendar'


function Home() {

    return (
        <div className='homepage'>
            <Taskbar />
            <Content>
                <div className='section-home'>
                    <p className='home-greeting'>Xin chào Người dùng ngu</p>
                    <div className='home-statistics'>
                        <ul className='statistics-all-tasks'>
                            <li className='a-statistic'>
                                <h3 className='name-statistic'>Tổng số nhiệm vụ</h3>
                                <p className='statistic-data'>0</p>
                            </li>
                            <li className='a-statistic'>
                                <h3 className='name-statistic'>Chưa thực hiện</h3>
                                <p className='statistic-data'>0</p>
                            </li>
                            <li className='a-statistic'>
                                <h3 className='name-statistic'>Đang thực hiện</h3>
                                <p className='statistic-data'>0</p>
                            </li>
                            <li className='a-statistic'>
                                <h3 className='name-statistic'>Đã hoàn thành</h3>
                                <p className='statistic-data'>0</p>
                            </li>
                        </ul>
                    </div>
                    <div className='chart-and-calendar'>
                        <Chart />
                        <Calendar />
                    </div>
                </div>
            </Content>
        </div>
    )
}

export default Home