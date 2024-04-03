/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTasks() {
  const docSnap = await getDoc(doc(db, "tasks", "mytask"));
  const docData = docSnap.data();
  if (docData == null) {
    return [];
  }
  return docData["tasks"];
}

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((fetched) => {
      console.log({ fetched });
      setTasks(fetched);
    });
  }, []);

  const onClick = async () => {
    const newTasks = [...tasks, text];
    setTasks(newTasks);
    await setDoc(doc(db, "tasks", "mytask"), {
      tasks: newTasks,
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
