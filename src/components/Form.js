import { useState } from "react";
import { nanoid } from "nanoid";
import { useTaskContext} from "../Context/TaskProvider";
import { Button } from "./Button";

import styles from './Form.module.css'



export const Form = () => {
    const {handleSubmitTask, setTask } = useTaskContext();
    
    const [todo, setTodo] = useState("")
    const [priority, setPriority]= useState("")


  function handleFormInputs () {
      setTask ({activity: todo, id: nanoid(), priority: priority || "unspecified", completed: false});
      setTodo("");
      setPriority("");
    }

  return (
    <form className={styles.form} onSubmit={handleSubmitTask}>
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        placeholder='type your task here'
      />

      <label htmlFor="priority"> Priority: </label>
      <select className = {styles.priority} id="priority" onChange={(e)=> setPriority(e.target.value)} value = {priority}>
        <option value="unspecified">Unspecified</option>
        <option value="less-urgent">Less Urgent</option>
        <option value="urgent">Urgent</option>
        <option value="very-urgent">Very Urgent</option>
      </select>

    <Button onClick = {handleFormInputs} type = "addTask">
      Add task
    </Button>
    </form>
  )
}

