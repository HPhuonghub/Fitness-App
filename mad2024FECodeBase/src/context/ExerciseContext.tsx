// ExerciseContext.js

import React, { createContext, useState, useContext } from 'react';

const defaultExercises = [];

const ExerciseContext = createContext(defaultExercises);

export const ExerciseProvider = ({ children }) => {
  const [addedExercises, setAddedExercises] = useState(defaultExercises);

  return (
    <ExerciseContext.Provider value={{ addedExercises, setAddedExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExerciseContext = () => {
  return useContext(ExerciseContext);
};
