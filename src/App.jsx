/* eslint-disable react/jsx-key */
import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <input
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          setTasks([...tasks, text]);
        }}
      >
        追加
      </button>

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
