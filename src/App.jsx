/* eslint-disable react/jsx-key */
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";

const firebaseConfig = {
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "tasks", "mytask2");

async function getTasks() {
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  return (docData?.["tasks"] ?? []).filter((t) => t.state !== "done");
}

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const updateTasks = async (newTasks) => {
    setTasks(newTasks);
    await setDoc(docRef, { tasks: newTasks });
  };

  useEffect(() => {
    getTasks().then((fetched) => {
      console.log({ fetched });
      setTasks(fetched);
    });
  }, []);

  const onClick = async () => {
    updateTasks([...tasks, { text, state: "todo" }]);
  };

  const onCheck = async (text, check) => {
    updateTasks(
      tasks.map((t) =>
        t.text === text ? { text, state: check ? "done" : "todo" } : t
      )
    );
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
          <input
            type="checkbox"
            checked={task.state === "done"}
            onChange={(e) => onCheck(task.text, e.currentTarget.checked)}
          />
          {task.text}
        </div>
      ))}
    </div>
  );
}

export default App;
