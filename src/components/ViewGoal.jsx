import './ViewGoal.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ViewGoal = () => {

    const { id } = useParams()
    const [goal, setGoal] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const data = await fetch(`http://localhost:3000/Tasks/${id}`).then(res=>res.json())
            setGoal(data)
            setLoading(false)
        }
        getData()
    },[id])

    const updateDB = () => {
        const body = goal
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch(`http://localhost:3000/Tasks/${id}`, options)
            .then(res=>res.json())
            .then(data=>console.log(data))
    }

    const completeTask = (task, index, subIndex) => {
        task.isCompleted = !task.isCompleted

        const updatedGoal = {...goal}
        updatedGoal.Tasks[index].subTasks.splice(subIndex, 1, task)

        let subTasksCompleted = true
        updatedGoal.Tasks[index].subTasks.forEach((subTask) => {
            subTask.isCompleted ? null : subTasksCompleted = false
        })

        if(subTasksCompleted) {
            updatedGoal.Tasks[index].isCompleted = true
        } else {
            updatedGoal.Tasks[index].isCompleted = false
        }

        setGoal(updatedGoal)
        updateDB()
    }

    return (
        <>
        {loading ?
        (<p>Loading...</p>)
        :
        (<section className='goalSection'>
            <div className='goalCard'>
                <h3>{goal.Title}</h3>
                <hr />
                <ul>
                    {goal.Tasks?.map((task, index) => (
                        <li key={index} >
                            <h4 className='taskTitle'>{task.Title} {task.isCompleted ? <span className='checkmark'>&#10003;</span> : null}</h4>
                            <ul>
                                {task.subTasks?.map((subTask, subIndex) => (
                                    <li key={subIndex} className={subTask.isCompleted ? 'subTaskTitle completed' : 'subTaskTitle'} onClick={(e)=>completeTask(subTask, index, subIndex)}>{subTask.Title}</li>
                                ))}
                            </ul>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
        </section>)
        }
        </>
    )
}

export default ViewGoal