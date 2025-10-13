import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// Fix: The 'React' namespace was not available. Imported Dispatch and SetStateAction directly and updated the function's return type to use them without the namespace.
export function useLocalStorage<T,>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const getStoredValue = (): T => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(getStoredValue);

    useEffect(() => {
        try {
            const valueToStore = JSON.stringify(storedValue);
            window.localStorage.setItem(key, valueToStore);
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}