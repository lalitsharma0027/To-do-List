
import { useState } from 'react';
import CustomForm from './components/CustomForm';
import TaskList from './components/TaskList';
import EditForm from './components/EditForm';
import useLocalStorage from './hook/useLocalStorage';


function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.task',[])
  const [editedTask, setEditedTask] = useState(null)
  const [previousFocusEL, setPreviousFocusEL] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])

  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (t.id === id ? { ...t, checked: !t.checked } : t)))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, name: task.name } : t)))
    closeEditMode()
  }

  const enterEditMode = (task) => {

    setEditedTask(task)
    setIsEditing(true)
    setPreviousFocusEL(document.activeElement)

  }
    
  const closeEditMode = () => {
    setIsEditing(false)
    previousFocusEL.focus()
  }
  const resetTasks = () => {
    setTasks([]);
   };


  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>

      {isEditing && (
        <EditForm editedTask={editedTask} updateTask={updateTask} closeEditMode={closeEditMode} />
      )}

      <CustomForm addTask={addTask} resetTasks={resetTasks} />

      {tasks && (<TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        enterEditMode={enterEditMode}
      />)}
    </div>
  );
}

export default App;
