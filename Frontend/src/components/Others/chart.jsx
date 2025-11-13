import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Thứ Hai', tasks: 12 },
    { name: 'Thứ Ba', tasks: 10 },
    { name: 'Thứ Tư', tasks: 8 },
    { name: 'Thứ Năm', tasks: 6 },
    { name: 'Thứ Sáu', tasks: 9 },
    { name: 'Thứ Bảy', tasks: 7 },
    { name: 'Chủ nhật', tasks: 1 },
]

function Taskchart() {
    return (
        <div style={{ width: '50%', height: 280 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 30, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="10 10" />
                    <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#333' }} />
                    <YAxis tick={{ fontSize: 8, fill: '#333' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Task hoàn thành trong 7 ngày trước" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Taskchart;