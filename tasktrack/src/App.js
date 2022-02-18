import logo from './logo.svg';
import './App.css';
import Header from './component/Header'
import Tasks from './component/Tasks';
import AddTask from './component/AddTask';
import { useEffect, useState } from 'react'
function App() {
const [showAddTask, setShowAddTask] = useState(false)
const [tasks, setTasks] = useState([
       
])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  // fetch data
 const fetchTasks = async () => {
      const res = await fetch(`http://localhost:5000/tasks`)
      const data = await res.json()
console.log(data)
     return data

    
      
 }
  //Fetch task
  const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
console.log(data)
     return data

    
      
    }
  // add task
  const addTask = async(task) => {

    const res = await fetch('http://localhost:5000/tasks/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()

    setTasks([...tasks, data])
    
  }
// delete task
  const deleteTask =async  (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })
   setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTasks(id)
    const updTask = { ...taskToToggle ,
    reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)

    })
    const data = await res.json()

    
    setTasks(tasks.map((task) => task.id == id ? { ...task, reminder: data.reminder  } : task))

   
}
  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask) }showAdd={showAddTask} />
      {showAddTask && <AddTask onAddTask={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : (
        'No Tasks To Show'
      )}
      
     
    </div>
  );
}

export default App;
