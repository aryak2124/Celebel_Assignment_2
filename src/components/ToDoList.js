import React, { useState, useEffect } from "react";
import "./ToDoList.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? task.completed
      : !task.completed
  );

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button className="add-task" onClick={addTask}>
        Add Task
      </button>
      <div className="filter-container">
        <button className="filter" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="filter" onClick={() => setFilter("active")}>
          Active
        </button>
        <button className="filter" onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {task.text}
            <div>
              <button
                className="complete"
                onClick={() => toggleTaskCompletion(index)}
              >
                {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
              </button>
              <button className="remove" onClick={() => removeTask(index)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
