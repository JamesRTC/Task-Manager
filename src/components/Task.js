import React, {  useState } from "react";
import { useTaskContext } from "../Context/TaskProvider";
import { Message } from "./Message";
import { Button } from "./Button";
import styles from './Task.module.css';
import { FilterTasks } from "./FilterTasks";

export const Task = () => {
  const { handleDeleteTask, handleEditTask, handleCompleteTask, tasks, error } = useTaskContext();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [priority, setPriority] = useState("");
  const [filter, setFilter] = useState('all');
  

  console.log(tasks);

  const filteredTasks = () => {
    switch (filter) {
      case 'all':
        return tasks.filter(task => task.priority === "urgent" || "less-urgent" || "very urgent" || "unspecified");
      case 'urgent':
        return tasks.filter(task => task.priority === 'urgent');
      case 'less-urgent':
        return tasks.filter(task => task.priority === 'less-urgent');
      case 'unspecified':
        return tasks.filter(task => task.priority === 'unspecified');
      case 'very-urgent':
        return tasks.filter(task => task.priority === 'very-urgent');
      // Add more cases for other filters as needed
      default:
        return tasks;
    }
  };

  const handleEditClick = (id, task) => {
    // Set the task with the given id for editing
    setEditingTaskId(id);
    setEditValue(task.activity);
    setPriority(task.priority || "");
  };

  const handleSaveEdit = (id, editedActivity, activity, priority) => {
    // Call the handleEditTask function to update the task
    handleEditTask(id, editedActivity, activity, priority);
    // Clear the editing state after saving the edit
    setEditingTaskId(null);
    setEditValue("");
    setPriority("");
  };

  const handleFinishTask = (id) => {
    handleCompleteTask (id)
  }

  if (error) return <Message message={error.message} />;
  if (tasks.length === 0) return <Message message="There are no tasks to display at the moment" />;
  if (filteredTasks().length === 0) {
    return (
      <>
      <FilterTasks setFilter={setFilter} filter = {filter}/>
      <Message message = "There are no tasks of this priority to display at the moment"/>
      </>
    )
  } 
  return (
    <div className={styles.taskWrapper}>

      <FilterTasks setFilter={setFilter} filter = {filter}/>

      {filteredTasks().map((task, index) => (
        <div className={`${styles.taskDiv} ${task.completed? styles.completed : ""}`} key={task.id}>
          <li>
            <span className={styles.numbering}>{index + 1}. </span>
            {editingTaskId === task.id ? (
              // If editing, show an input field
              <form>
                <input
                  type="text"
                  value={editingTaskId === task.id ? editValue : task.activity}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Enter your edited text here"
                />

                <label htmlFor="priority"> Priority: </label>
                <select className={styles.priority} id="priority" onChange={(e) => setPriority(e.target.value)} value={priority}>
                  <option value="unspecified">Unspecified</option>
                  <option value="less-urgent">Less Urgent</option>
                  <option value="urgent">Urgent</option>
                  <option value="very-urgent">Very Urgent</option>
                </select>

                <Button
                  onClick={() => handleSaveEdit(task.id, editValue, task.activity, priority)}
                  type="saveEdit"
                >
                  Save Edit
                </Button>
              </form>
            ) : (
              // If not editing, display the task activity
              <>
                <span className={styles.task}>{task.activity}</span>
              </>
            )}
          </li>

          {editingTaskId !== task.id  && <Button type={task.priority}>{task.priority}</Button>}

          <div className={styles.iconWrappers}>
            {editingTaskId !== task.id && task.completed !== true && (
              // Show edit icon only if not currently editing
              <span onClick={() => handleEditClick(task.id, task)} className={styles.edit}>
                  <span className={styles.toolTip}>Edit</span><ion-icon name="create-outline"></ion-icon>
              </span>
            )}
            
           {  task.completed !== true && <span onClick = {()=> handleFinishTask (task.id)} className={styles.finish}>
                  <span className={styles.toolTip}>Completed</span> <ion-icon name="trophy-outline"></ion-icon>
              </span>}

            <span onClick={() => handleDeleteTask(task.id)} className={styles.delete}>
                <span className={styles.toolTip}>Delete</span><ion-icon name="trash-outline"></ion-icon>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
