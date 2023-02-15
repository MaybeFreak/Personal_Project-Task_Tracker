import './CreatePage.css'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const CreatePage = ({ getGoals }) => {

    const navigate = useNavigate()

    const [goal, setGoal] = useState('')
    const [tasks, setTasks] = useState([])

    const addTask = () => {
        const newTasks = [...tasks]
        newTasks.push({Title: ''})
        setTasks(newTasks)
    }

    const addSubTask = (task, index) => {
        if(task.subTasks) {
            task.subTasks.push({Title: '', isCompleted: false})
        } else {
            console.log('subTasks not found')
            task.subTasks = [{Title: '', isCompleted: false}]
        }
        console.log(task)
        const updatedTasks = [...tasks]
        updatedTasks.splice(index, 1, task)
        setTasks(updatedTasks)
    }

    const handelGoalChange = (e) => {
        const value = e.target.value
        setGoal(value)
    }

    const handelTaskNameChange = (e, task, index) => {
        const value = e.target.value

        task.Title = value
        const updatedTasks = [...tasks]
        updatedTasks.splice(index, 1, task)
        setTasks(updatedTasks)
    }

    const removeTask = (index) => {
        const updatedTasks = [...tasks]
        updatedTasks.splice(index, 1)
        setTasks(updatedTasks)
    }

    const handelSubTaskChange = (e, subTask, subIndex, index) => {
        const value = e.target.value
        subTask.Title = value

        const updatedTasks = [...tasks]
        updatedTasks[index].subTasks.splice(subIndex, 1, subTask)
        setTasks(updatedTasks)
    }

    const removeSubTask = (subIndex, index) => {
        const updatedTasks = [...tasks]
        updatedTasks[index].subTasks.splice(subIndex, 1)
        setTasks(updatedTasks)
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        const GoalToSubmit = {Title: goal, Tasks: tasks}
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(GoalToSubmit)
        }
        fetch(`http://localhost:3000/Tasks`, options)
            .then(()=>getGoals())
            .then(navigate('/'))
    }

    return (
        <section className='create'>
            <form onSubmit={(e)=>handelSubmit(e)}>
                <h3>Create a new Goal</h3>
                <input type="text" value={goal} name="GoalTitle" onChange={(e)=>handelGoalChange(e)} placeholder='Goal Title...'/>
                <hr />
                {tasks.map((task, index) => (
                    <div key={index} className='task'>
                        <div className="taskHeader">
                            <h3>{task.Title}</h3>
                            <button type='button' onClick={()=>removeTask(index)}>Remove Task</button>
                        </div>
                        <input type='text' value={task.Title} onChange={(e)=>handelTaskNameChange(e, task, index)} placeholder='New Task...'/>
                            {task.subTasks?.map((subTask, subIndex) => (
                                <div key={subIndex} className='subTask'>
                                    <input type='text' value={subTask.Title} onChange={(e)=>handelSubTaskChange(e, subTask, subIndex, index)} placeholder='Sub task...'/>
                                    <button type='button' onClick={()=>removeSubTask(subIndex, index)}>Remove sub task</button>
                                </div>
                            ))}
                        <br />
                        <button type='button' onClick={()=>addSubTask(task, index)}>Add sub Task</button>
                        <hr />
                    </div>
                ))}
                <button type='button' onClick={addTask}>Add Task</button>
                <button type='submit'>Submit new Goal</button>
            </form>
        </section>
    )
}

export default CreatePage

{/* <p>Create a new task</p>
<input type='text'></input>
<button>Add sub tasks</button> */}