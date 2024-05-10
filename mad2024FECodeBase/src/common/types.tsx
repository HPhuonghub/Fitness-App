/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Plan, Workout } from '@/data';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Home: undefined;
  PlanOverview: { workout: Workout };
  OnBoarding: undefined;
  PlanOverview_Plan: { plan: Plan };
  Discover: undefined;
  Personal: undefined;
  WorkoutSetting: undefined;
  GeneralSetting: undefined;
  Reminder: undefined;
  Profile: undefined;
  Favorites: undefined;
  Language: undefined;
  Personality: undefined;
  Login: undefined;
  DoExercise: undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
