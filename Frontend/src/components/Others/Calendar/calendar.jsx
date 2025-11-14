import { React, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './style.css'

function Taskcalendar() {
    const [date, setDate] = useState(new Date());

    return (
        <div style={{ maxWidth: 250, margin: '10px auto' }}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    fontSize: '10px',
                    textAlign: 'center',
                }}
            >
                <Calendar
                    onChange={setDate}
                    value={date}
                    backgroundColor='black'
                />
            </div>
        </div>
    )
}

export default Taskcalendar;