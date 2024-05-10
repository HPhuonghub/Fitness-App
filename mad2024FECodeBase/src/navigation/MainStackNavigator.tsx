import {
  Home,
  Discover,
  Personal,
  WorkoutSetting,
  GeneralSetting,
  CalendarScreen,
  Login,
} from '@/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeIcon as HomeUnactive } from 'react-native-heroicons/outline';
import { HomeIcon as HomeActive } from 'react-native-heroicons/solid';

import { CalendarDaysIcon as CalendarUnactive } from 'react-native-heroicons/outline';
import { CalendarDaysIcon as CalendarActive } from 'react-native-heroicons/solid';

import { UserCircleIcon as PersonalUnactive } from 'react-native-heroicons/outline';
import { UserCircleIcon as PersonalActive } from 'react-native-heroicons/solid';

import { Square2StackIcon as Square2StackIconActive } from 'react-native-heroicons/solid';
import { Square2StackIcon as Square2StackIconUnactive } from 'react-native-heroicons/outline';

import { BookOpenIcon as DiscoverUnactive } from 'react-native-heroicons/outline';
import { BookOpenIcon as DiscoverActive } from 'react-native-heroicons/solid';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/common/types';
import PlanOverviewScreen from '@/screens/PlanOverviewScreen';
import Reminder from '@/screens/Reminder';
import Profile from '@/screens/Profile';
import Favorites from '@/screens/Favorites';
import Language from '@/screens/Language';
import { CustomStackNavigator } from './CustomStackNavigator';
import { AppNavigator } from './AppNavigator';
import DoExercise from '../screens/DoExercise/DoExercise';
import { DoDoWorkout } from '@/screens/DoDoWorkout/DoDoWorkout';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="PlanOverview"
        component={PlanOverviewScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="DoExercise"
        component={DoExercise}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoDoWorkout"
        component={DoDoWorkout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default MainStackNavigator;
