import { React, useState, useEffect } from 'react'
import './style.css'
import Taskbar from '../../components/Taskbar/taskbar'
import Content from '../../components/Content/content'
import Chart from '../../components/Others/Chart/chart'
import Calendar from '../../components/Others/Calendar/calendar'
import { getTasks } from '../../../api/task'



function Home() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getTasks();
                setTasks(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Không lấy được tasks', err);
            }
        };
        load();
    }, []); // [] giúp effect chỉ chạy lần đầu

    const allTasks = tasks.length;
    const completedTasks = Object.values(tasks).filter(task => task.Status === 'Đã hoàn thành').length;
    const inProcessTasks = Object.values(tasks).filter(task => task.Status === 'Đang làm').length;
    const readyTasks = Object.values(tasks).filter(task => task.Status === 'Chưa làm').length;

    return (
        <div className='homepage'>
            <Taskbar />
            <Content>
                <div className='section-home'>
                    <p className='home-greeting'>Xin chào bạn</p>
                    <div className='home-statistics'>
                        <ul className='statistics-all-tasks'>
                            <li className='a-statistic'>
                                <h3 className='name-statistic'>Tổng số nhiệm vụ</h3>
                                <p className='statistic-data'>{allTasks}</p>
                            </li>
                            <li className='a-statistic'>
                                <h3 className='name-statistic'>Chưa thực hiện</h3>
                                <p className='statistic-data'>{readyTasks}</p>
                            </li>
                            <li className='a-statistic'>
                                <h3 className='name-statistic'>Đang thực hiện</h3>
                                <p className='statistic-data'>{inProcessTasks}</p>
                            </li>
                            <li className='a-statistic'>
                                <h3 className='name-statistic'>Đã hoàn thành</h3>
                                <p className='statistic-data'>{completedTasks}</p>
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