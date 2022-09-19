import { useState } from 'react'
import useWorkoutContext from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };
        const emptyFieldsTemp = [];
        if (!title) { emptyFieldsTemp.push('title'); }
        if (!load) { emptyFieldsTemp.push('load'); }
        if (!reps) { emptyFieldsTemp.push('reps'); }
        if (emptyFieldsTemp.length > 0) {
            setError(`please fill the fields: ${emptyFieldsTemp}`);
            setEmptyFields(emptyFieldsTemp);
            return;
        }

        const response = await fetch('/api/workouts/', {
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
            setEmptyFields([]);
            console.log('new workout added:', json);
        }



    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input type="text" className={emptyFields.includes('title') ? 'error' : ''} onChange={e => setTitle(e.target.value)} value={title} />

            <label>Load (kg):</label>
            <input type="number" className={emptyFields.includes('load') ? 'error' : ''} onChange={e => setLoad(e.target.value)} value={load} />

            <label>Reps:</label>
            <input type="number" className={emptyFields.includes('reps') ? 'error' : ''} onChange={e => setReps(e.target.value)} value={reps} />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm;