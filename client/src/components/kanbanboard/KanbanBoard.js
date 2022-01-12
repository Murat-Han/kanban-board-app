import { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import TaskList from "../tasklist/TaskList";
import AddTask from "../addtask/AddTask";
import "./kanbanboard.css";

import { GlobalContext } from "../../services/taskContext";

function KanbanBoard() {
  //TASK DATA FROM TASK CONTEXT;
  const { taskData } = useContext(GlobalContext);

  const [tasks, setTasks] = useState(
    JSON.parse(window.localStorage.getItem("tasks")) || taskData
  );

  const [visible, setVisible] = useState(false);
  const [columnInfo, setColumnInfo] = useState(null);

  //defining position of task cards and setting drag and drop
  const onDragEnd = (result) => {
    const { destination, source } = result;

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (start === finish) {
      const newTasks = Array.from(start.taskList);
      console.log(newTasks);
      const swapTask = newTasks[source.index];
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, swapTask);
      const newColumnsState = tasks.map((column) => {
        if (column.id === start.id) {
          column.taskList = newTasks;
          return column;
        } else return column;
      });
      const newColumnsState2 = [...newColumnsState];
      setTasks(newColumnsState2);
    } else {
      //positioning items after drag and drop
      if (finish.taskList.length < finish.limit) {
        const startTasks = Array.from(start.taskList);
        console.log(startTasks);
        const [item] = startTasks.splice(source.index, 1);
        const finishTasks = Array.from(finish.taskList);
        finishTasks.splice(destination.index, 0, item);
        const newColumnsState = tasks.map((col) => {
          if (col.id === start.id) {
            col.taskList = startTasks;
            return col;
          } else if (col.id === finish.id) {
            col.taskList = finishTasks;
            return col;
          } else return col;
        });
        const newColumnsState2 = [...newColumnsState];
        setTasks(newColumnsState2);
      } else return;
    }
  };

  //open new task box
  const openNewTaskBox = (data) => {
    const columnId = data.id;
    setColumnInfo(columnId);
    setVisible(true);
  };

  //close new task box
  const closeNewTaskBox = () => {
    setVisible(false);
  };

  //adding new task
  const addTask = (newTask) => {
    setVisible(false);
    const updatedColumns = tasks.map((column) => {
      if (column.id === newTask.columnId && column.taskList.length < 6) {
        column.taskList.push(newTask);
        return column;
      } else return column;
    });
    setTasks(updatedColumns);
  };

  //removing task
  const removeTask = (taskId) => {
    const updatedColumns = tasks
      .map((column) => {
        return Object.assign({}, column, {
          taskList: column.taskList.filter((task) => task.id !== taskId),
        });
      })
      .filter((column) => column.taskList.length >= 0);
    setTasks(updatedColumns);
  };

  //editing task
  const editTask = (taskId, newTitle, newText) => {
    const updatedColumns = tasks.map((column) => {
      return Object.assign({}, column, {
        taskList: column.taskList.map((task) => {
          if (task.id === taskId) {
            task.title = newTitle;
            task.text = newText;
            return task;
          }
          return task;
        }),
      });
    });
    setTasks(updatedColumns);
    console.log(updatedColumns)
  };

  //saving tasks to localstorage
  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {visible && (
            <AddTask
              closeNewTaskBox={closeNewTaskBox}
              addTask={addTask}
              columnData={tasks[columnInfo - 1]}
            />
          )}
          <h1 className="kanban-title">Kanban Board</h1>
          <div className="kanban-columns-container">
            {tasks.map((col) => {
              return (
                <TaskList
                  columnData={col}
                  key={col.name}
                  openNewTaskBox={openNewTaskBox}
                  removeTask={removeTask}
                  editTask={editTask}
                />
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </>
  );
}

export default KanbanBoard;
