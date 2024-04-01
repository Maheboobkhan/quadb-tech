import React from "react";
import AddTask from "./components/AddTask/AddTask";
import TaskList from "./components/TaskList/TaskList";
import EditTask from "./components/EditTask/EditTask";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/" element={<TaskList />} />
        <Route path="/edit-task" element={<EditTask />} />
      </Routes>
    </div>
  );
};

export default App;
