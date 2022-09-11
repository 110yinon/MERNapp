import { useEffect } from 'react'

// componetns
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import useWorkoutContext from '../hooks/useWorkoutsContext';

const Home = () => {

    const { workouts, dispatch } = useWorkoutContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts/');
            const json = await response.json();
            console.log(response);

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        }

        fetchWorkouts();
    }, [dispatch])


    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => {
                    return <WorkoutDetails key={workout._id} workout={workout} />
                })}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;