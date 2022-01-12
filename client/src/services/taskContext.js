import React, { useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./taskSlice";

const taskLimitNumber = 6;

//TASK COLUMNS DATA
const columns = [
  {
    id: 1,
    name: "Backlogs",
    limit: taskLimitNumber,
    color: "#C340A1",
    taskList: [],
  },
  {
    id: 2,
    name: "To do",
    limit: taskLimitNumber,
    color: "#6A6DCD",
    taskList: [],
  },
  {
    id: 3,
    name: "In progress",
    limit: taskLimitNumber,
    color: "#d93535",
    taskList: [],
  },
  {
    id: 4,
    name: "Designed",
    limit: taskLimitNumber,
    color: "#00A88B",
    taskList: [],
  },
];

export const GlobalContext = createContext(columns);

export const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  //DATA FROM GLOBAL STATE
  const taskDataFromAPI = useSelector((state) => state.tasks.tasks);
 
  //PUT TASKS THAT FETCHED FROM API INTO COLUMNS
  const putTasksIntoColumns = (columnData, tasks) => {
    return columnData.map((column) => {
      tasks.forEach((task) => {
        if (task.columnId === column.id) {
          column.taskList.push(task);
        }
      });
      return column;
    });
  };

  //PUT TASKS THAT FETCHED FROM API INTO COLUMNS
  let taskData = putTasksIntoColumns(columns, taskDataFromAPI);

  console.log(taskData);

  return (
    <GlobalContext.Provider value={{ taskData: taskData, putTasksIntoColumns }}>
      {children}
    </GlobalContext.Provider>
  );
};
