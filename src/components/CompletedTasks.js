import { useState, useEffect } from "react";
import { useTaskContext } from "../Context/TaskProvider";
import styles from './CompletedTasks.module.css'
export const CompletedTasks = () => {
    const { tasks } = useTaskContext();
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Use the useEffect hook to update count only when tasks change
        const completedCount = tasks.reduce((acc, task) => task.completed ? acc + 1 : acc, 0);
        setCount(completedCount);
    }, [tasks]);

    return  <p className={styles.completedTasks}> Completed tasks: <span className={styles.count}>{count}</span>/{tasks.length}</p>


};

