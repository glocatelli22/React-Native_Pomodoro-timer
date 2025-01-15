export enum Status {
    open = 1, 
    completed
};

export enum FormMode {
    add,
    edit
};

export type Tasks = Task[];

export interface Task {
    id: string, 
    title: string, 
    duration: number, 
    description?: string,
    status: Status,
};

export interface TimerSettings {
    timerLength: number,
    tomatoForLongPause: number,
    tomatoBeforeLongPause: number,
    shortPauseLength: number,
    longPauseLength: number,
    isTimerRunning: boolean,
    isPause: boolean,
    resetTimer: number
};

export interface FormState {
    title: string,
    description?: string,
    duration: string,
    status: Status
};

export interface SettingsFormState {
    longPauseLength: number,
    shortPauseLength: number,
    timerLength: number,
    tomatoForLongPause: number
};

export type SettingsInputType = keyof SettingsFormState;

export type InputType = keyof FormState;
