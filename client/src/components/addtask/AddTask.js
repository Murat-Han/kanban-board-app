import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "./addtask.css";

import { createTask } from "../../services/taskSlice";

function AddTask({ closeNewTaskBox, addTask, columnData }) {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const columnId = columnData.id;
  let taskId = uuidv4();
  const newTask = {
    id: taskId,
    title: title,
    text: text,
    columnId: columnId,
  };

  const handleChangeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleChangeText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <div className="add-task-box">
      <section
        className="box-content"
        style={{ backgroundColor: `${columnData.color}` }}
      >
        <div className="close-btn-container">
          <button className="close-btn" onClick={closeNewTaskBox}>
            X
          </button>
        </div>
        <form
          className="task-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            addTask(newTask);
            dispatch(createTask({ columnId, taskId, text, title }));
          }}
        >
          <div className="task-input-container">
            <label htmlFor="user">Title:</label>
            <input
              className="title-input"
              type="text"
              name="user"
              id="user"
              value={title}
              onChange={handleChangeTitle}
            ></input>
          </div>
          <div className="task-input-container">
            <label htmlFor="task">Task: </label>
            <textarea
              className="task-input"
              type="text"
              cols="20"
              rows="5"
              value={text}
              onChange={handleChangeText}
              name="task"
              id="task"
            ></textarea>
          </div>

          <button className="submit-btn">Add</button>
        </form>
      </section>
    </div>
  );
}

export default AddTask;
