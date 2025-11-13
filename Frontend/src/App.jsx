import './App.css'
import Home from './pages/Home/home'
import Tasks from './pages/Tasks/tasks'
import Setting from './pages/Setting/setting'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/setting' element={<Setting />} />
      </Routes>
    </Router>
  )
}

export default App
