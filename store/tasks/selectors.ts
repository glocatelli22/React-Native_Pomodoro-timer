import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Status } from "../../types";

const tasks = (state:RootState) => state.tasks.tasks;
const activeTaskId = (state:RootState) => state.tasks.activeTaskId;
const tomatoBeforeLongPause = (state: RootState) => state.timer.tomatoBeforeLongPause;
const isPause = (state: RootState) => state.timer.isPause;
const shortPauseLength = (state: RootState) => state.timer.shortPauseLength;
const longPauseLength = (state: RootState) => state.timer.longPauseLength;
const timerLength = ( state: RootState) => state.timer.timerLength;

export const openTasksSelector = createSelector(
    [tasks], 
    tasks => tasks.filter(task => task.status === Status.open)
);

export const completedTasksSelector = createSelector(
    [tasks], 
    tasks => tasks.filter(task => task.status === Status.completed)
);

export const activeTaskSelector = createSelector(
    [tasks, activeTaskId], 
    (tasks, activeTaskId) => tasks.find(task => task.id === activeTaskId) || null
);

export const contextTimerSelector = createSelector(
    [timerLength, shortPauseLength, longPauseLength, tomatoBeforeLongPause, isPause], 
    (timerLength, shortPauseLength, longPauseLength, tomatoBeforeLongPause, isPause) => {
        if(!isPause) {
            return timerLength;
        }
        return tomatoBeforeLongPause <= 0 ? longPauseLength : shortPauseLength;
    }
);