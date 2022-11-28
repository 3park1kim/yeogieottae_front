import React, { useState } from "react";

const useLocalStorage = (key: string, initialValue: any): any => {
  const [storedValue, setStoredValue] = useState<any>(() => {
    if (typeof window == "undefined") {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.log(e);
      return initialValue;
    }
  });

  const setValue = (value: any): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
