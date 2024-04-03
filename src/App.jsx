/* eslint-disable react/jsx-key */
import { useState } from "react";
import "./App.css";

function getTasks() {
  const tasksString = localStorage.getItem("tasks");
  if (tasksString != null) {
    return JSON.parse(tasksString);
  } else {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState(getTasks());

  const onClick = () => {
    const newTasks = [...tasks, text];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <div>
      <input
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
      />
      <button onClick={onClick}>追加</button>

      {tasks.map((task) => (
        <div>
          <input type="checkbox" />
          {task}
        </div>
      ))}
    </div>
  );
}

export default App;
