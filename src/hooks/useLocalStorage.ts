import React, { useEffect } from 'react';
import { useState } from 'react';

function useLocalStorage<T>(key: string, initalValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initalValue === 'function') {
      return (initalValue as () => T)();
    } else {
      return initalValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
