import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

function Taskchart() {
    const generateLast7Days = () => {
        const days = []
        const today = new Date()

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)

            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const dateLabel = `${day}/${month}`

            days.push({
                name: dateLabel,
                CompletedTasks: Math.floor(Math.random() * 15) + 1 // Giá trị mẫu, bạn có thể thay bằng dữ liệu thực
            })
        }

        return days
    }

    const data = generateLast7Days()

    return (
        <ResponsiveContainer width='50%' height={280}>
            <BarChart data={data} margin={{ top: 30, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#333' }} />
                <YAxis tick={{ fontSize: 8, fill: '#333' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="CompletedTasks" name='Nhiệm vụ đã hoàn thành' fill="#000000" barSize={20} />
            </BarChart>
        </ResponsiveContainer >
    )
}

export default Taskchart;