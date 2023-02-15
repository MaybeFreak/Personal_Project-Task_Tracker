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
            console.log(data)
            setGoal(data)
            setLoading(false)
        }
        getData()
    },[id])

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
                    {goal.Tasks.map((task, index) => (
                        <li key={index} >
                            <h4>{task.Title}</h4>
                            <ul>
                                {task.subTasks?.map((subTask, index) => (
                                    <li key={index}>{subTask.Title}</li>
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