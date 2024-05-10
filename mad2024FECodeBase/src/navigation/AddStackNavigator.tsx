import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AddExercises } from '@/screens/AddExercises/AddExercises';
import { CustomWorkout } from '@/screens/Custom/CustomWorkout';
import AddedExercisesScreen from '@/screens/AddedExercisesScreen/AddedExercisesScreen';

const AddStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="CustomWorkout" component={CustomWorkout} />
      <Stack.Screen name="AddExercise" component={AddExercises} />
      <Stack.Screen
        name="AddedExercisesScreen"
        component={AddedExercisesScreen}
      />
    </Stack.Navigator>
  );
};

export default AddStackNavigator;
