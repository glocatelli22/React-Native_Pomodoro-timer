import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { TimerSettings } from "../../types";

const timerState: TimerSettings = {
    timerLength: 1500000,
    tomatoBeforeLongPause: 2,
    tomatoForLongPause: 2,
    shortPauseLength: 300000,
    longPauseLength: 600000,
    isPause: false,
    isTimerRunning: false,
    resetTimer: 0
};

type SettingsUpdateObj = Omit<TimerSettings, 'tomatoBeforeLongPause' | 'isPause' | 'isTimerRunning'>

const timerSlice = createSlice({
    name: 'timer',
    initialState: timerState,
    reducers: {
        setTimerSettings: (state, action:PayloadAction<SettingsUpdateObj>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setTomatoBeforeLongPause: (state, action:PayloadAction<number>) => {
            state.tomatoBeforeLongPause = action.payload;
        },
        setIsTimerRunning: (state, action:PayloadAction<boolean>) => {
            state.isTimerRunning = action.payload;
        },
        setIsPause: (state, action:PayloadAction<boolean>) => {
            state.isPause = action.payload;
        },
        decreaseTomatoForLongPause: state => {
            state.tomatoBeforeLongPause = state.tomatoBeforeLongPause-1;
        },
        resetTomatoForLongPause: state => {
            state.tomatoBeforeLongPause = state.tomatoForLongPause;
        }
    }
});

export const { 
    setTimerSettings,
    setTomatoBeforeLongPause,
    setIsTimerRunning,
    setIsPause,
    decreaseTomatoForLongPause,
    resetTomatoForLongPause
} = timerSlice.actions;

export default timerSlice;