export const Reducer = (state,action) => {
    switch(action.type){

        case "ADD_TASK":
            return {...state,tasks:[...state.tasks,action.payload ] }

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.id)
            };

        case "EDIT_TASK":
            console.log(action.payload)
            return {
                ...state,
                tasks: state.tasks.map(task =>
                  task.id === action.payload.id
                    ? { ...task, ...action.payload } 
                    : task 
                )
              };

        case "COMPLETE_TASK":
            return {
                ...state,
                tasks:state.tasks.map( task => 
                    task.id === action.payload.id 
                    ?
                    {...task,isCompleted:true}
                    :
                    task
                )
            }
        default: 
         return state
    }
}