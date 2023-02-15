import './Goals.css'
import { Link } from "react-router-dom"

const Goals = ({ tasks }) => {
    return (
        <section className="goals">
            <ul>
                {tasks.map((task,index) => (
                    <li key={index}>
                        <Link to={`/goal/${task.id}`} > {task.Title} </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Goals