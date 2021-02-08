import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Task from "./components/Tasks";
import About from "./components/About";

function App() {
  const [showAddbtn, setShowAddbtn] = useState(false);
  const [tasks, setTasks] = useState([]);

  //Seting tasks
  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };
    getTask();
  }, []);

  //fetching tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5001/tasks");
    const data = res.json();
    console.log(data);
    return data;
  };

  //fetching task single
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5001/tasks/${id}`);
    const data = res.json();
    console.log(data);
    return data;
  };

  //add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  //deleting task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5001/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              reminder: !task.reminder,
            }
          : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={() => setShowAddbtn(!showAddbtn)}
          isAddOpen={showAddbtn}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddbtn && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Task
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Tasks to show!!"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
