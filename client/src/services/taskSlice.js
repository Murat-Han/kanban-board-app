import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  loading: true,
};

// CREATE TASK TO DATABASE OVER REST API
export const createTask = createAsyncThunk("createTask", async (newTask) => {
  const response = await axios.post("https://kanban-board-app.murat-han.repl.co/", {
    id: newTask.taskId,
    columnId: newTask.columnId,
    title: newTask.title,
    text: newTask.text,
  });
  if (!response.ok) {
    throw new Error(
      `This is an HTTP post error: The status is ${response.status}`
    );
  }
  return response.data;
});

// GET TASKS FROM DATABASE OVER REST API
export const getTasks = createAsyncThunk("getTasks", async () => {
  const response = await axios.get("https://kanban-board-app.murat-han.repl.co/kanbanpublic");
  console.log(response.data);
  return response.data;
});

// UPDATE TASK TO DATABASE OVER REST API
export const updateTask = createAsyncThunk(
  "updateTask",
  async (task_Id, columnId, title, text) => {
    const response = await axios.put("https://kanban-board-app.murat-han.repl.co/", {
      id: task_Id,
      columnId: columnId,
      title: title,
      text: text,
    });
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    console.log(response.data);
    return response.data.json;
  }
);

//DELETE TASK FROM DATABASE OVER REST API
export const deleteTask = createAsyncThunk("deleteTask", async (_id) => {
  try {
    const response = await axios.delete("https://kanban-board-app.murat-han.repl.co/", {
      id: _id,
    });
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    return { _id };
  } catch (error) {
    console.log(error);
  }
});

//CREATING REDUX TOOLKIT SLICE
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: {
    [createTask.fulfilled]: (state, action) => {
      state.tasks.push(action.payload);
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
      state.loading = false;
    },
    [updateTask.fulfilled]: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload,
      };
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      let index = state.tasks.findIndex((task) => task.id === payload);
      console.log(index);
      state.tasks.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const taskReducer = taskSlice.reducer;
