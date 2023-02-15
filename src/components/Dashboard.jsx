import './Dashboard.css'
import Goals from "./Goals"

const Dashboard = ({tasks}) => {

    return (
        <main> 
            <h2>Your Goals</h2>
            <section className="goalsList">
                <Goals tasks={tasks}/>
            </section>
        </main>
    )
}

export default Dashboard
