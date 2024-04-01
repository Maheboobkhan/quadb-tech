import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AddTask/AddTask.css";
import { MyContext } from "../../MyContext";

const AddTask = () => {
  const navigate = useNavigate();
  const { tasks, addTask, setTasks } = useContext(MyContext);
  const [Taskname, setTaskname] = useState("");
  const [Taskdesc, setTaskdesc] = useState("");
  const [Prioritylevel, setPrioritylevel] = useState("");

  const handleAddTask = () => {
    if (!Taskname || !Taskdesc || !Prioritylevel) {
      alert("Please fill all the input fields.");
      return;
    }
    const newTask = {
      taskName: Taskname,
      description: Taskdesc,
      priority: Prioritylevel,
      completed: false,
    };

    console.log("newT: " + newTask.taskName);

    addTask(newTask);
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Clear the form fields after adding the task
    setTaskname("");
    setTaskdesc("");
    setPrioritylevel("");

    // console.log(tasks);

    navigate("/");
  };
  return (
    <div className="container">
      <h1>Add Task</h1>
      <form>
        <label>Task name</label>
        <input
          type="text"
          onChange={(e) => setTaskname(e.target.value)}
          value={Taskname}
          required
        />
        <label>Task description</label>
        <textarea
          onChange={(e) => setTaskdesc(e.target.value)}
          value={Taskdesc}
          required
        ></textarea>
        <label>Priority level</label>
        <select
          onChange={(e) => setPrioritylevel(e.target.value)}
          value={Prioritylevel}
          required
        >
          <option value="">select level</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
