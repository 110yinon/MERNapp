import useWorkoutContext from "../hooks/useWorkoutsContext";


const WorkoutDetails = ({ workout }) => {
    const { workouts, dispatch } = useWorkoutContext();
    const handleClick = async () => {

        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: 'DELETE'
        });
        const json = await response.json();

        if (!response.ok) {
            console.log(`error: ${json.message}`);
        }

        console.log('workout deleted:', json);
        const data = workouts.filter(workout => workout._id !== json._id);
        // console.log(data);
        dispatch({ type: 'DELETE_WORKOUT', payload: data })
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>x</span>
        </div>
    )
}

export default WorkoutDetails;