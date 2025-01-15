import { createListenerMiddleware, current } from "@reduxjs/toolkit";
import { RootState } from ".";
import { storeTasks } from "../db";

export const tasksUpdateMiddleware = createListenerMiddleware();

tasksUpdateMiddleware.startListening({
    predicate: (_, currentState, previousState) => {
        return (currentState as RootState).tasks.tasks !== (previousState as RootState).tasks.tasks;
    },
    effect: (_, listenerApi) => {
        const tasks = (listenerApi.getState() as RootState).tasks.tasks;
        storeTasks(tasks);
    }
});