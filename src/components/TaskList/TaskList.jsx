import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "../TaskList/TaskList.css";
import { MyContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();

  const { tasks, setTasks } = useContext(MyContext);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleTasks = tasks.slice(startIndex, startIndex + itemsPerPage);

  const goToAddTask = () => {
    navigate("/add-task");
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const markAsCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    navigate("/edit-task", { state: { taskToEdit, index } });
  };

  return (
    <div className="task-list">
      <h1 className="task-list-heading">Task List</h1>
      <div className="task-list-container">
        {tasks.length === 0 ? (
          <div className="no-task-found">
            <h1>No Task Found</h1>
            <span>To add a task, click on </span>
            <span className="no-task-found-btn" onClick={goToAddTask}>
              Add Task
            </span>
          </div>
        ) : (
          visibleTasks.map((task, index) => (
            <div
              key={index}
              className={`task-item ${task.completed ? "completed-task" : ""}`}
            >
              <div className="task-item-container">
                <h4>{task.taskName}</h4>
                <p>{task.description}</p>
                <p className="priority">{task.priority}</p>
              </div>
              <div className="actions">
                <FaEdit onClick={() => editTask(index)} className="icons" />
                <MdDeleteOutline
                  onClick={() => deleteTask(index)}
                  className="icons"
                />
              </div>
              <p
                className={`${task.completed ? "completed" : "mark-done"}`}
                onClick={() => markAsCompleted(index)}
              >
                {task.completed ? "Completed" : "Mark done"}
              </p>
            </div>
          ))
        )}
      </div>

      {tasks.length > 0 && <button onClick={goToAddTask}>Add More Task</button>}

      {tasks.length > 0 && (
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-info">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
