import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "../cards/Card";
import "./tasklist.css";

function TaskList({ columnData, openNewTaskBox, removeTask, editTask }) {
  return (
    <div className="task-list-column">
      <div className="column-content">
        <h2 className="column-name">{columnData.name}</h2>
        <Droppable droppableId={`${columnData.id - 1}`}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              className="tasks-container"
              {...provided.droppableProps}
            >
              {columnData.taskList.map((task, index) => {
                return (
                  <Card
                    key={task.id}
                    id={task.id}
                    task={task}
                    color={columnData.color}
                    index={index}
                    removeTask={removeTask}
                    editTask={editTask}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="btn-container">
          <button
            className="btn-add"
            onClick={() => openNewTaskBox(columnData)}
            disabled={columnData.taskList.length >= 6 ? true : false}
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
