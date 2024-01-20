import { createContext, useContext, useEffect, useReducer, useState } from 'react';

const TaskContext = createContext();

const initialState = {
  tasks: []
};



function reducer(state, action) {
  switch (action.type) {
    case "setTasks":
      return {...state, tasks: action.payload}
    case 'adding':
      return { ...state, tasks: [...state.tasks, action.payload]};
    case "editing":
      return {...state, tasks: action.payload}
    case "deleting":
      return {...state, tasks: state.tasks.filter(task=> task.id !== action.payload)}
    case "completing":
      return {...state, tasks: state.tasks.map(task=> task.id === action.payload? {...task, completed: !task.completed} : task)}
    case "clearTasks":
      return {...state, tasks: action.payload !== "all"? state.tasks.filter(task=> task.priority !== action.payload) : []}
    default:
      throw new Error('There was an error');
  }
}

export const TaskProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({ activity: '', id: '', priority: '', completed: false });
  const [error, setError] = useState("");
  const [{ tasks }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      if (!loading) {
        localStorage.setItem("myTasks", JSON.stringify(tasks));
      }
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    } 
  }, [tasks, loading]);


  useEffect(() => {
    try {  
      const storedData = JSON.parse(localStorage.getItem('myTasks'));
      if (storedData && storedData.length > 0) {
        dispatch({ type: 'setTasks', payload: storedData });
      } 
    } finally {
      setLoading(false);
    }
  }, []); // empty dependency array to run only once

  function handleSubmitTask(e) {
    e.preventDefault();
   
    if (task.activity.trim() !== '') {
      dispatch({ type: 'adding', payload: task });
    }
  }

  function handleDeleteTask(id) {
    dispatch({ type: 'deleting', payload: id });
  }

  function handleEditTask(id, editedvalue, prevActivity, priority) {
    dispatch({
      type: 'editing',
      payload: tasks.map((task) =>
        task.id === id
          ? { ...task, activity: editedvalue === "" ? prevActivity : editedvalue, priority: priority || "unspecified" }
          : task
      ),
    });
  }
  
  const handleCompleteTask = (id) => {
    dispatch({type: "completing", payload: id})
  }

  function clearTasks (filter) {
    dispatch ({type: "clearTasks", payload: filter})
  }

  return (
    <TaskContext.Provider
      value={{ tasks, task, setTask, handleSubmitTask, handleDeleteTask, handleEditTask, handleCompleteTask, clearTasks, error }}
    >
      {children}
    </TaskContext.Provider>
  );
};

function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) throw new Error('TaskContext was used outside TaskProvider');
  return context;
}

export { useTaskContext };
