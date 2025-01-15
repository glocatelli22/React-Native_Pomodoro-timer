import { createSlice } from "@reduxjs/toolkit";
import { Status, Task, Tasks } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { loadTasks } from "./thunks";

type ActiveTaskId = Task['id'] | null;
const initialState: { activeTaskId: ActiveTaskId, tasks: Tasks, isLoading: boolean} = { tasks: [], activeTaskId: null, isLoading: false};
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, action:PayloadAction<Task>) => {
            const firstOpenTask = state.tasks.findIndex(task => task.status === Status.open);
            if(firstOpenTask === -1) {
                state.activeTaskId = action.payload.id;
            }
            state.tasks.push(action.payload);
        },
        updateTask: (state, action:PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if(index !== -1) {
                state.tasks[index] = action.payload;
            }
            if(action.payload.status === Status.completed && action.payload.id === state.activeTaskId) {
                state.activeTaskId = null
            }   
        },
        decreaseTomato: (state) => {
            if(!state.activeTaskId) { 
                return state; 
            }
            const index = state.tasks.findIndex(task => task.id === state.activeTaskId);
            if(index == -1) {
                return state;
            }
            state.tasks[index].duration = state.tasks[index].duration -1;
            if(state.tasks[index].duration === 0) {
                state.tasks[index].status =  Status.completed;
                state.activeTaskId = null;
            }
        },
        setActiveTask: (state, action:PayloadAction<ActiveTaskId>) => {
            state.activeTaskId = action.payload;
            if(action.payload) {
                const index = state.tasks.findIndex(task => task.id === action.payload);
                const task = state.tasks.splice(index, 1);
                state.tasks.unshift(task[0]);  
            }
        },
        deleteTask: (state, action:PayloadAction<string>) => {
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        }
    },
    extraReducers(builder) {
        builder.addCase(loadTasks.fulfilled, (state, action) => {
            if(action.payload.length) {
                state.tasks = action.payload;
                state.isLoading = false;
            }
        });
        builder.addCase(loadTasks.pending, state => {
            state.isLoading = true;
        });
    }
});

export const {addTask, updateTask, deleteTask, setActiveTask, decreaseTomato} = tasksSlice.actions;
export default tasksSlice;