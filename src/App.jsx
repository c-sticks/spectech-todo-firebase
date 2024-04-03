/* eslint-disable react/jsx-key */
import { useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // この行を追加
import { doc, setDoc, getDoc } from "firebase/firestore"; // この行を追加 2

const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // この行を追加
await setDoc(doc(db, "cities", "new-city-id"), {
  hoge: "xxxx",
});
const docSnap = await getDoc(doc(db, "cities", "new-city-id"));
const docData = docSnap.data();

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

    // これを追加 2
    setDoc(doc(db, "cities", "new-city-id"), {
      hoge: "aaaoa",
    });
  };

  return (
    <div>
      <input
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
      />
      <button onClick={onClick}>追加</button>

      {JSON.stringify(docData)}

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
