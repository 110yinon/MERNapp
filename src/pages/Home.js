import { useEffect, useState } from 'react'

// componetns
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {

    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts/');
            const json = await response.json();
            console.log(response);

            if (response.ok) {
                setWorkouts(json);
            }
        }

        fetchWorkouts();
    }, [])


    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => {
                    return <WorkoutDetails key={workout._id} workout={workout} />
                })}
            </div>
        </div>
    )
}

export default Home;