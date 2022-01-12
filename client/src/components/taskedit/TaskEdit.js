import { useState } from "react";
import { useDispatch } from "react-redux";

import "./taskedit.css";
import { updateTask } from "../../services/taskSlice";

function TaskEdit({
  taskId,
  task_Id,
  columnId,
  textOld,
  titleOld,
  color,
  editTask,
  cancelEdit,
}) {
  const dispatch = useDispatch();
  const [text, setText] = useState(textOld);
  const [title, setTitle] = useState(titleOld);

  const handleChangeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleChangeText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editTask(taskId, title, text);
        console.log(typeof task_Id);
        dispatch(updateTask(task_Id, columnId, title, text));
        cancelEdit();
      }}
      className="task-edit-form"
      style={{ backgroundColor: `${color}` }}
    >
      <div className="input-container">
        <label htmlFor="user">Task Title:</label>
        <input
          className="title-input"
          type="text"
          name="title"
          id="user"
          placeholder={title}
          onChange={handleChangeTitle}
          value={title}
        ></input>
      </div>
      <div className="textarea-container">
        <label htmlFor="task">Task: </label>
        <textarea
          className="text-input"
          type="text"
          cols="15"
          rows="5"
          onChange={handleChangeText}
          value={text}
          name="task"
          id="task"
        ></textarea>
      </div>
      <div className="btn-container">
        <button className="save-btn" type="submit">
          Save
        </button>
        <button className="cancel-btn" onClick={() => cancelEdit()}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskEdit;
