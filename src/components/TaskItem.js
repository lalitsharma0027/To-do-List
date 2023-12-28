import { useState } from 'react'
import styles from './TaskItem.module.css'

// lib import 

import { CheckIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'



const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
    const [isChecked, setIsChecked] = useState(task.checked)

    const handleCheckBoxChange = (e) => {
        setIsChecked(!isChecked)
        toggleTask(task.id);

    }
    return (
        <li className={styles.task}>
            <div className={styles["task-group"]}>
                
                <input
                    type="checkbox"
                    name={task.name}
                    id={task.id}
                    checked={isChecked}
                    className={styles.checkbox}
                    onChange={handleCheckBoxChange}
                />
                <label
                    htmlFor={task.id}
                    className={styles.label}
                >
                    {task.name}
                    <p className={styles.checkmark}>
                        <CheckIcon strokeWidth={2} width={24} height={24} />
                    </p>
                </label>

                <div className={styles["task-group"]}>
                    <button className='btn' aria-label={`Update ${task.name} task`}
                        onClick={() => enterEditMode(task)}
                    >
                        <PencilSquareIcon width={24} height={24} />
                    </button>
                    <button className={`btn ${styles.delete}`} aria-label={`Delete ${task.name} task`}
                        onClick={() => deleteTask(task.id)}
                    >
                        <TrashIcon width={24} height={24} />
                    </button>
                </div>
            </div>

        </li>

    )

}

export default TaskItem