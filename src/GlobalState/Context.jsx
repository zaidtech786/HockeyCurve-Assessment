import React, { useEffect, useReducer, useState } from 'react';
import { Reducer } from './Reducer';

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const initialState = {
    tasks: []
  };
  const [isOn, setIsOn] = useState(false);

  const getTodos = JSON.parse(localStorage.getItem("todos")) || initialState;

  // Initialize the useReducer with the retrieved state
  const [state, dispatch] = useReducer(Reducer, getTodos);

  // Store the updated state in localStorage whenever 'state' changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]); 

  return (
    <AppContext.Provider value={{ ...state, dispatch ,isOn ,setIsOn}}>
      {children}
    </AppContext.Provider>
  );
};
