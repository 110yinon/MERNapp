import { useState } from 'react'
import useWorkoutContext from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };
        const emptyFields = [];
        if (!title) { emptyFields.push('title'); }
        if (!load) { emptyFields.push('load'); }
        if (!reps) { emptyFields.push('reps'); }
        if (emptyFields.length > 0) {
            setError(`please fill the fields: ${emptyFields}`);
            return;
        }

        const response = await fetch('http://localhost:4000/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        // console.log(json);


        if (!response.ok) {
            console.log(`error: ${json.message}`);
            setError(json.message);
        }
        else {
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            console.log('new workout added:', json);
        }



    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input type="text" onChange={e => setTitle(e.target.value)} value={title} />

            <label>Load (kg):</label>
            <input type="number" onChange={e => setLoad(e.target.value)} value={load} />

            <label>Excersize Title:</label>
            <input type="number" onChange={e => setReps(e.target.value)} value={reps} />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm;