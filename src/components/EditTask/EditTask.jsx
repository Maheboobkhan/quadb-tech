import React, { useState, useContext } from "react";
import "../EditTask/EditTask.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";

const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks, setTasks } = useContext(MyContext);
  const { taskToEdit, index: taskIndex } = location.state || {};

  const [editedTask, setEditedTask] = useState({
    Taskname: taskToEdit ? taskToEdit.taskName : "",
    Taskdesc: taskToEdit ? taskToEdit.description : "",
    Prioritylevel: taskToEdit ? taskToEdit.priority : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleEditTask = () => {
    // Perform actions to save the edited task, for example, make an API call or update the global state
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      taskName: editedTask.Taskname,
      description: editedTask.Taskdesc,
      priority: editedTask.Prioritylevel,
      // completed: tasks[taskIndex].completed, // Preserve the 'completed' status
    };
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");

    console.log("ta: " + updatedTasks);
  };

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <form>
        <label>Task name</label>
        <input
          type="text"
          name="Taskname"
          onChange={handleInputChange}
          value={editedTask.Taskname}
        />
        <label>Task description</label>
        <textarea
          name="Taskdesc"
          onChange={handleInputChange}
          value={editedTask.Taskdesc}
        ></textarea>
        <label>Priority level</label>
        <select
          name="Prioritylevel"
          onChange={handleInputChange}
          value={editedTask.Prioritylevel}
        >
          <option value="">select level</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <button type="button" onClick={handleEditTask}>
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
