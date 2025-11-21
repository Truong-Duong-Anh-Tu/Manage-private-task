import { React, useState, useEffect } from 'react'
import './style.css'
import Taskbar from '../../components/Taskbar/taskbar'
import Content from '../../components/Content/content'
import { getTasks, createTask, updateTask, deleteTask } from '../../../api/task'


function Tasks() {

    const [tasks, setTasks] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [appliedQuery, setAppliedQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [editTask, setEditTask] = useState(null)
    const [newTask, setNewTask] = useState({
        name: '',
        due: '',
        summit: '',
        status: 'Chưa làm',
    })

    const normalizeApiData = (data) => {
        if (Array.isArray(data)) return data
        if (Array.isArray(data?.$values)) return data.$values
        if (Array.isArray(data?.value)) return data.value
        if (Array.isArray(data?.data)) return data.data
        return []
    }

    const load = async () => {
        setLoading(true);
        const data = await getTasks();
        setTasks(normalizeApiData(data));
        setLoading(false);
    };

    console.log(tasks)

    const resetModal = () => {
        setNewTask({
            name: '',
            due: '',
            summit: '',
            status: 'Chưa làm',
        })
        setEditTask(null)
    }

    const handleCreateClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        resetModal()
    }

    const handleEditTask = (task) => {
        const normalized = {
            id: task?.id ?? task?.Id ?? null,
            name: task?.name ?? task?.Name ?? '',
            due: task?.due ?? task?.Due ?? '',
            summit: task?.summit ?? task?.Summit ?? '',
            status: task?.status ?? task?.Status ?? 'Chưa làm',
        }
        setNewTask({
            name: normalized.name,
            due: normalized.due,
            summit: normalized.summit,
            status: normalized.status,
        })
        setEditTask(normalized.id)
        setIsModalOpen(true)
    }

    const handleModalSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            Name: newTask.name.trim(),
            Due: newTask.due,
            summit: newTask.summit,
            Status: newTask.status,
        }



        try {
            if (editTask) {
                console.log(`Đang cập nhật nhiệm vụ ID: ${editTask}`);

                const originalTask = tasks.find(t => (t?.id ?? t?.Id) === editTask);
                const updatePayload = {
                    ...originalTask,
                    ...payload,
                };

                await updateTask(editTask, updatePayload);
                console.log('Cập nhật thành công');
            }
            else {
                console.log('Đang tạo mới nhiệm vụ');
                await createTask(payload);
                console.log('Tạo mới thành công');
            }

            await load();
        } catch (error) {
            console.error('Lỗi khi thực hiện API:', error);
        }
        handleCloseModal()
    }

    const handleDeleteTask = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa task này không ?')) {
            try {
                await deleteTask(id);
                console.log(`Đã xóa nhiệm vụ ID: ${id}`);
                await load();
            } catch (error) {
                console.error('Lỗi khi xóa nhiệm vụ:', error);
                alert('Không thể xóa nhiệm vụ. Vui lòng kiểm tra console.');
            }
        }
    }


    const normalizedQuery = (appliedQuery ?? '').toString().toLowerCase()
    const filteredData = tasks.filter((row) => {
        const name = (row?.name ?? row?.Name ?? '')
        const status = row?.status ?? row?.Status ?? ''
        const nameText = name == null ? '' : name.toString().toLowerCase()
        const statusText = status == null ? '' : status.toString()
        const matchesName = nameText.includes(normalizedQuery)
        const matchesStatus = statusFilter === 'all' || statusText === statusFilter
        return matchesName && matchesStatus
    })

    const formatDate = (value) => {
        if (!value || value === "0001-01-01" || value.startsWith("0001-01-01")) {
            return "";
        }
        return value;
    };

    useEffect(() => { load(); }, []);

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
                                    <th className='thStyle'>Tên nhiệm vụ</th>
                                    <th className='thStyle'>Ngày tới hạn</th>
                                    <th className='thStyle'>Ngày hoàn thành</th>
                                    <th className='thStyle'>Trạng thái</th>
                                    <th className='thStyle thActions'>☰</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td className='tdStyle no-data' colSpan={5}>
                                            Không có nhiệm vụ nào phù hợp
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((row) => {
                                        const id = row?.id ?? row?.Id
                                        const name = row?.name ?? row?.Name ?? ''
                                        const due = formatDate(row?.due ?? row?.Due)
                                        const summit = formatDate(row?.summit ?? row?.Summit)
                                        const status = row?.status ?? row?.Status ?? ''
                                        return (
                                            <tr key={id}>
                                                <td className='tdStyle'>{name || '-'}</td>
                                                <td className='tdStyle'>{due || '-'}</td>
                                                <td className='tdStyle'>{summit || '-'}</td>
                                                <td className='tdStyle'>{status || '-'}</td>
                                                <td className='tdStyle'>
                                                    <div className='action-buttons'>
                                                        <button className='action-btn edit-btn' onClick={() => handleEditTask(row)}>✎</button>
                                                        <button className='action-btn delete-btn' onClick={() => handleDeleteTask(id)}>✖</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
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
                                            value={newTask.summit}
                                            onChange={(e) => setNewTask({ ...newTask, summit: e.target.value })}
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