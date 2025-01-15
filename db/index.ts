import * as firebase from 'firebase/app';
import { get, getDatabase, ref, set } from "firebase/database";
import { Status } from '../types';
import { Task } from '../types';
const firebaseConfig = {
    databaseURL: "https://domatotimer-default-rtdb.europe-west1.firebasedatabase.app/",
};
  
  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const database = getDatabase(app);
const tasksRef = ref(database, '/tasks');

export const storeTasks = async (tasks: Task[]) => {
    const res = await set(tasksRef, tasks);
    console.log(res);
};

export const getTasks = async() : Promise<Task[]> => {
    try {
        const res = await get(tasksRef);
        if(res.exists()){
            return res.val();
        }
        return [];
    } catch (err) {
        throw new Error('Failed to load tasks');
    }
};