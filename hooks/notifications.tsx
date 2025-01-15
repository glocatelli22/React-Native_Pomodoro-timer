import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useRef } from "react";
import { Alert } from "react-native";

export const useNotifications = () => {

    const permissionRef = useRef(false);
    const notificationRef = useRef('');

    const configureNotificationPermit = useCallback(async () => {
        const { status } = await  Notifications.getPermissionsAsync();	
        let finalStatus = status;
        if(finalStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if(finalStatus !== 'granted') {
            Alert.alert('',  'Without notification you\'ll not receive alerts when timer elapses');
            permissionRef.current = false;
            return;
        }
        permissionRef.current = true;
    }, []);

    const cancelNotificationHandler = async () => {
        await Notifications.cancelScheduledNotificationAsync(notificationRef.current);
        notificationRef.current = '';
    };

    const cancelAllNotificationHandler = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        notificationRef.current;
    };

    const scheduleNotificationHandler = async (time: number, title: string, body: string) => {
        if(permissionRef.current === true && !notificationRef.current) {
            notificationRef.current = await Notifications.scheduleNotificationAsync({
                content: {
                    title,
                    body
                },
                trigger: { 
                    type:  Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, 
                    seconds: time
                }
            });
        } 
    };
    
    useEffect(() => {
        configureNotificationPermit();
    }, [configureNotificationPermit]);  
    
    return { cancelNotificationHandler, scheduleNotificationHandler, cancelAllNotificationHandler };
};