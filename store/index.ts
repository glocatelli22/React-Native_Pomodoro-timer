import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasks";
import timerSlice from './timer';
import { tasksUpdateMiddleware } from "./middleware";

const store = configureStore({
    reducer: {
        [tasksSlice.name]: tasksSlice.reducer,
        [timerSlice.name]: timerSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(tasksUpdateMiddleware.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;