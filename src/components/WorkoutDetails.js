import useWorkoutContext from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({ workout }) => {
    const { workouts, dispatch } = useWorkoutContext();
    const handleClick = async () => {

        const response = await fetch(`/api/workouts/${workout._id}`, {
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
            <p>
                {
                    formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})
                }
            </p>
            <span class="material-symbols-outlined" onClick={handleClick}>
                delete
            </span>
        </div>
    )
}

export default WorkoutDetails;