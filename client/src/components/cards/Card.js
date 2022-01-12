import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import "./card.css";

import TaskEdit from "../taskedit/TaskEdit";
import { deleteTask } from "../../services/taskSlice";

function Card({ task, index, color, editTask, removeTask }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const cancelEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <div
          className="card"
          style={{ backgroundColor: `${color}` }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <TaskEdit
              color={color}
              editTask={editTask}
              taskId={task.id}
              task_Id={task._id}
              columnId={task.columnId}
              titleOld={task.title}
              textOld={task.text}
              cancelEdit={cancelEdit}
            />
          ) : (
            <div
              className="card-content"
              style={{ backgroundColor: `${color}` }}
            >
              <span className="task-title">{task.title}</span>

              <div className="task-text">{task.text}</div>
              <div className="button-container">
                <button className="btn-edit" onClick={handleEdit}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    removeTask(task.id);
                    console.log(task._id);
                    dispatch(deleteTask(task._id));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
