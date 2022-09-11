import { WorkoutContext } from '../context/WorkoutContext'
import { useContext } from 'react'

const useWorkoutContext = () => {

    const context = useContext(WorkoutContext);

    if(!context){
        throw new Error('useWorkoutContext inside the scope of the WorkoutContextProvider');
    }

    return context;

};

export default useWorkoutContext;