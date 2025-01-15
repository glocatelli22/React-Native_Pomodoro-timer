import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks } from "../../db";

export const loadTasks = createAsyncThunk('tasks/loadTasks', async (_, thunkApi) => {
   return getTasks();
});
