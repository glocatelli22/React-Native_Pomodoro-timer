import { useState } from "react";


export const useForm = <T, U>(initalFormState: T): [T, (id: keyof T, value: U) => void] => {

    const [formState, setFormState] = useState<T>(initalFormState);
    
    const handleInputChange = (id: keyof T, value: U) => {
        setFormState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    return [ formState, handleInputChange ];
};