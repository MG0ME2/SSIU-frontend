import {useState} from "react";

export function useLocalStoragee(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      console.log('constante 1', JSON.parse(item));
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log('constante 2', initialValue);
      return initialValue;
    }
  });
  
  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}
