import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './EditPage.css'

const EditPage = () => {

    const { id } = useParams()
    const [goal, setGoal] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            const data = await fetch(`http://localhost:3000/Tasks/${id}`).then(res=>res.json())
            setGoal(data)
            setLoading(false)
        }
        getData()
    },[])

    const addTask = () => {
        const updatedGoal = {...goal}
        updatedGoal.Tasks.push({Title: '', isCompleted: false})
        setGoal(updatedGoal)
    }

    const addSubTask = (task, index) => {
        if(task.subTasks) {
            task.subTasks.push({Title: '', isCompleted: false})
        } else {
            console.log('subTasks not found')
            task.subTasks = [{Title: '', isCompleted: false}]
        }
        const updatedGoal = {...goal}
        setGoal(updatedGoal)
    }

    const handelGoalChange = (e) => {
        const value = e.target.value
        const updatedGoal = {...goal}
        updatedGoal.Title = value
        setGoal(updatedGoal)
    }

    const handelTaskNameChange = (e, task, index) => {
        const value = e.target.value

        const updatedGoal = {...goal}
        updatedGoal.Tasks[index].Title = value
        setGoal(updatedGoal)
    }

    const removeTask = (index) => {
        const updatedGoal = {...goal}
        updatedGoal.Tasks.splice(index, 1)
        setGoal(updatedGoal)
    }

    const handelSubTaskChange = (e, subTask, subIndex, index) => {
        const value = e.target.value

        const updatedGoal = {...goal}
        updatedGoal.Tasks[index].subTasks[subIndex].Title = value
        setGoal(updatedGoal) 
    }

    const removeSubTask = (subIndex, index) => {
        const updatedGoal = {...goal}
        updatedGoal.Tasks[index].subTasks.splice(subIndex, 1)
        setGoal(updatedGoal)
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        const GoalToSubmit = goal
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(GoalToSubmit)
        }
        fetch(`http://localhost:3000/Tasks/${id}`, options)
            .then(navigate(`/goal/${id}`))
    }

    return (
        <>
        {loading ?
        (<div>Loading...</div>)
        :
        (<section className='create'>
            <form onSubmit={(e)=>handelSubmit(e)}>
                <h3>Edit your Goal</h3>
                <input type="text" value={goal.Title} name="GoalTitle" onChange={(e)=>handelGoalChange(e)} placeholder='Goal Title...'/>
                <hr />
                {goal.Tasks?.map((task, index) => (
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
                <button type='submit'>Save changes</button>
            </form>
        </section>)
        }
        </>
    )
}

export default EditPage