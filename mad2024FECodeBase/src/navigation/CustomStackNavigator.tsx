import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddExercises } from '@/screens/AddExercises/AddExercises';
import { CustomWorkout } from '@/screens/Custom/CustomWorkout';
import { DoWorkout } from '@/screens/DoWorkout/DoWorkout';
import { StartWorkout } from '@/screens/StartWorkout/StartWorkout';
import { RestScreen } from '@/screens/RestScreen/RestScreen';
import CompletionScreen from '@/screens/CompleteScreen/CompletionScreen ';
import AddedExercisesScreen from '@/screens/AddedExercisesScreen/AddedExercisesScreen';

const Stack = createNativeStackNavigator();

export const CustomStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="CustomWorkout"
        component={CustomWorkout}
        // options={{ title: 'Welcome' }}
      />
      <Stack.Screen name="DoWorkout" component={DoWorkout} />
      <Stack.Screen name="StartWorkout" component={StartWorkout} />
      <Stack.Screen name="RestScreen" component={RestScreen} />
      <Stack.Screen name="CompletionScreen" component={CompletionScreen} />
      <Stack.Screen name="AddExercise" component={AddExercises} />
      <Stack.Screen
        name="AddedExercisesScreen"
        component={AddedExercisesScreen}
      />
    </Stack.Navigator>
  );
};
