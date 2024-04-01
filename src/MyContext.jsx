// import { createContext, useState } from "react";

// export const MyContext = createContext("");

// const MyContextProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);
//   const addTask = (currTask) => {
//     // setTasks([...tasks, currTask]);
//     setTasks((pre) => {
//       return [...pre, currTask];
//     });
//   };

//   return (
//     <MyContext.Provider value={{ tasks, setTasks, addTask }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// export default MyContextProvider;

import { createContext, useState, useEffect } from "react";

export const MyContext = createContext("");

const MyContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (currTask) => {
    setTasks((pre) => {
      const updatedTasks = [...pre, currTask];
      // Save tasks to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <MyContext.Provider value={{ tasks, setTasks, addTask }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
