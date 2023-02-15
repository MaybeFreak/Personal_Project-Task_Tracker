import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import ViewGoal from './components/ViewGoal'
import CreatePage from './components/CreatePage'

function App() {

  const [tasks, updateTasks] = useState([])

  const getGoals = () =>{
    console.log('Updating Tasks')
    fetch(`http://localhost:3000/Tasks`)
      .then(res=>res.json())
      .then(data=>updateTasks(data))
  }

  useEffect(() => {
    getGoals()
  },[])

  return (
    <>
      <header >
        <Link to='/'>
          <h1>Task Tracker</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to='/create'>Create a new Goal</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes >
        <Route path='/' element={<Dashboard tasks={tasks} />} />
        <Route path='/goal/:id' element={<ViewGoal />} />
        <Route path='/create' element={<CreatePage getGoals={getGoals}/>} />
      </Routes>
    </>
  )
}

export default App

{/* <main>
{tasks.map((task) => (
  <ul>
    {task.Title}
    {task.Tasks.map((task,index) => (
      <li key={index}>
        {task.Title}
        <ul>
          {task.subTasks.map((task,index) => (
            <li key={index}>{task.Title}</li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
))}
</main> */}