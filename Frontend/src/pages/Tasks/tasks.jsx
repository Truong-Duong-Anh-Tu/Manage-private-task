import { React, useState } from 'react'
import './style.css'
import Taskbar from '../../components/Taskbar/taskbar'
import Content from '../../components/Content/content'


function Tasks() {

    const [searchQuery, setSearchQuery] = useState('')
    const [appliedQuery, setAppliedQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newTask, setNewTask] = useState({
        name: '',
        due: '',
        completeddate: '',
        status: 'Chưa làm',
    })

    const data = [
        { id: 1, name: 'mission a', due: '9/9/2026', completeddate: '9/9/2025', status: 'Đã hoàn thành' },
        { id: 2, name: 'mission b', due: '10/12/2025', completeddate: '', status: 'Đang làm' },
        { id: 3, name: 'mission c', due: '7/7/2050', completeddate: '', status: 'Chưa làm' },
    ];

    const resetModal = () => {
        setNewTask({
            name: '',
            due: '',
            completeddate: '',
            status: 'Chưa làm',
        })
    }

    const handleCreateClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        resetModal()
    }

    const handleModalSubmit = (e) => {
        e.preventDefault()
        console.log('New task submitted:', newTask)
        handleCloseModal()
    }


    const filteredData = data.filter((row) => {
        const matchesName = row.name.toLowerCase().includes(appliedQuery.toLowerCase())
        const matchesStatus = statusFilter === 'all' || row.status === statusFilter
        return matchesName && matchesStatus
    })

    return (
        <div className='taskspage'>
            <Taskbar />
            <Content>
                <div className='section-tasks'>
                    <div className='search-container'>
                        <input className='search-tasks' type='text' placeholder='Nhập tên task' onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') setAppliedQuery(searchQuery) }} />
                        <button className="search-btn" onClick={() => setAppliedQuery(searchQuery)}>Search</button>
                    </div>
                    <div className='status-filter-wrapper-and-create'>
                        <select
                            className='status-filter' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value='all'>Tất cả trạng thái</option>
                            <option value='Đã hoàn thành'>Đã hoàn thành</option>
                            <option value='Đang làm'>Đang làm</option>
                            <option value='Chưa làm'>Chưa làm</option>
                        </select>
                        <button className='create-new-task' onClick={handleCreateClick}>Tạo mới</button>
                    </div>
                    <div className='container-list-tasks'>
                        <table className='table-list-task'>
                            <thead>
                                <tr>
                                    <th className='thStyle'>Tên nhiêm vụ</th>
                                    <th className='thStyle'>Ngày tới hạn</th>
                                    <th className='thStyle'>Ngày hoàn thành</th>
                                    <th className='thStyle'>Trạng thái</th>
                                    <th className='thStyle thActions'>☰</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row) => (
                                    <tr key={row.id}>
                                        <td className='tdStyle'>{row.name}</td>
                                        <td className='tdStyle'>{row.due}</td>
                                        <td className='tdStyle'>{row.completeddate || '-'}</td>
                                        <td className='tdStyle'>{row.status}</td>
                                        <td className='tdStyle'>
                                            <div className='action-buttons'>
                                                <button className='action-btn edit-btn'>✎</button>
                                                <button className='action-btn delete-btn'>✖</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isModalOpen && (
                        <div className='modal-backdrop' onClick={handleCloseModal}>
                            <div className='modal' onClick={(e) => e.stopPropagation()}>
                                <div className='modal-header'>
                                    <h3>Thêm nhiệm vụ mới</h3>
                                    <button className='modal-close' onClick={handleCloseModal}>×</button>
                                </div>
                                <form className='modal-form' onSubmit={handleModalSubmit}>
                                    <label>
                                        Tên nhiệm vụ
                                        <input
                                            type='text'
                                            value={newTask.name}
                                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Ngày tới hạn
                                        <input
                                            type='date'
                                            value={newTask.due}
                                            onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Ngày hoàn thành
                                        <input
                                            type='date'
                                            value={newTask.completeddate}
                                            onChange={(e) => setNewTask({ ...newTask, completeddate: e.target.value })}
                                        />
                                    </label>
                                    <label>
                                        Trạng thái
                                        <select
                                            value={newTask.status}
                                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                                        >
                                            <option value='Chưa làm'>Chưa làm</option>
                                            <option value='Đang làm'>Đang làm</option>
                                            <option value='Đã hoàn thành'>Đã hoàn thành</option>
                                        </select>
                                    </label>
                                    <div className='modal-actions'>
                                        <button type='button' className='modal-cancel' onClick={handleCloseModal}>
                                            Hủy
                                        </button>
                                        <button type='submit' className='modal-submit'>
                                            Lưu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </Content >
        </div >
    )
}

export default Tasks