import styles from './FilterTasks.module.css'
import { Button } from './Button';
import { useTaskContext } from '../Context/TaskProvider';
export const FilterTasks = ({ setFilter, filter}) => {
  const {clearTasks} = useTaskContext(); 
  const filterName = filter? filter : ""

  console.log(filter);
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  function clearToDos (filter) {
    clearTasks(filter)
  }

  return (
    <div className={styles.filterWrapper}>
      <label htmlFor="filter" >Filter by Priority:</label>
      <select className= {styles.filter} id="filter" onChange={handleChange} value ={filter}>
        <option value="all">All Tasks</option>
        <option value="very-urgent">Very Urgent</option>
        <option value="urgent">Urgent</option>
        <option value="less-urgent">Less Urgent</option>
        <option value="unspecified">Unspecified</option>
        {/* Add more options for other filters */}
      </select>

      <Button onClick = {()=> clearToDos(filter)} type = "clearTasks">Clear {filterName} Tasks</Button>
    </div>
  );
};

