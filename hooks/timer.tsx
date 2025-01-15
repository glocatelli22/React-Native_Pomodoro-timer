import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { decreaseTomato } from "../store/tasks";
import { decreaseTomatoForLongPause, resetTomatoForLongPause, setIsPause, setIsTimerRunning } from "../store/timer";
import { useNotifications } from "./notifications";

export const useTimer = (time: number) : [() => void, () => void, () => void, number] => {
    
    const SECOND = 1000;
    const [remainingMs, setRemainingMs] = useState(time);
    const timer = useRef<ReturnType<typeof setInterval>>();
    const dispatch = useAppDispatch();
    const { isPause, isTimerRunning, tomatoBeforeLongPause, resetTimer } = useAppSelector(state => state.timer);
    const { scheduleNotificationHandler, cancelNotificationHandler, cancelAllNotificationHandler } = useNotifications();
    
    const startTimer = useCallback(() => {
        if(timer.current) return;
        dispatch(setIsTimerRunning(true));
        timer.current = setInterval(() => {
            setRemainingMs(prev => prev - 1000)
        },SECOND)
        const pauseText = tomatoBeforeLongPause === 1 ? 'time for a long pause' : 'take a short rest' 
        const bodyTxt = isPause ? 'let\'s get back to work' : pauseText;
        scheduleNotificationHandler(remainingMs/1000, 'Time\'s up ', bodyTxt);
    }, [remainingMs, isPause, tomatoBeforeLongPause]);

    const stopTimer = useCallback(() => {
        if(!timer.current) return;
        clearInterval(timer.current);
        timer.current = undefined;
        dispatch(setIsTimerRunning(false));
        cancelNotificationHandler();
    }, [time]);

    const resetTimerHandler = useCallback(() => {
        stopTimer();
        setRemainingMs(time);
    }, [stopTimer])

    const handleBackgroundTimer = async (nextAppStatus: AppStateStatus) => {
        console.log(nextAppStatus);
        if(!timer.current) {
            return;
        }
        if(nextAppStatus.includes('background')) {
            await AsyncStorage.setItem('now', new Date().getTime().toString());
            return; 
        } 
        const oldTimestamp = await AsyncStorage.getItem('now');
        if(!oldTimestamp) {
            return;
        }
        const elapsedTime = new Date().getTime() - parseInt(oldTimestamp);
        setRemainingMs(prev => prev - elapsedTime);
    };

    useEffect(() => {
        if(remainingMs <= 0 && isTimerRunning) {
            resetTimerHandler();
            if(!isPause) {     
                dispatch(decreaseTomato());
                dispatch(decreaseTomatoForLongPause());
            } else {
                dispatch(setIsPause(false));
                if(tomatoBeforeLongPause === 0) {
                    dispatch(resetTomatoForLongPause());
                }
            }
            dispatch(setIsPause(!isPause));
        }
    }, [remainingMs, stopTimer, isPause, isTimerRunning])

    useEffect(() => {
        resetTimerHandler();
        return () =>  {
            if(timer.current) {
                clearInterval(timer.current);
            }
        }
    }, [time, resetTimer, resetTimerHandler])

    useEffect(() => {
        const subscription = AppState.addEventListener("change", handleBackgroundTimer);
        return () => {
            cancelAllNotificationHandler();
            subscription.remove()
        };
    }, []);

    return [startTimer, stopTimer, resetTimerHandler, remainingMs]
};