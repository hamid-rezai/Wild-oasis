import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null || storedValue === undefined) {
        return initialState;
      }
      return JSON.parse(storedValue);
    } catch (error) {
      console.warn(`Failed to parse localStorage key "${key}":`, error);
      return initialState;
    }
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
