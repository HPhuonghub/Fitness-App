import {
  Home,
  Discover,
  Personal,
  WorkoutSetting,
  GeneralSetting,
  CalendarScreen,
  Login,
  DoDoWorkout,
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
import AddStackNavigator from './AddStackNavigator';
import { StartStartWorkout } from '@/screens/StartStartWorkout/StartStartWorkout';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function StackScreenHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlanOverview"
        component={PlanOverviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartStartWorkout"
        component={StartStartWorkout}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="DoExercise"
        component={DoExercise}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

function StackScreenDiscover() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlanOverview"
        component={PlanOverviewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function StackScreenPersonal() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Personality"
        component={Personal}
        options={{ headerShown: false }}
        x
      />
      <Stack.Screen
        name="WorkoutSetting"
        component={WorkoutSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralSetting"
        component={GeneralSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reminder"
        component={Reminder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Training') {
            iconSource = focused ? (
              <HomeActive color="white" fill="blue" size={20} />
            ) : (
              <HomeUnactive color="white" size={20} />
            );
            // } else if (route.name === 'Discovery') {
            //   iconSource = focused ? (
            //     <DiscoverActive color="white" fill="blue" size={20} />
            //   ) : (
            //     <DiscoverUnactive color="white" size={20} />
            //   );
          } else if (route.name === 'Calendar') {
            iconSource = focused ? (
              <CalendarActive color="white" fill="blue" size={20} />
            ) : (
              <CalendarUnactive color="white" size={20} />
            );
          } else if (route.name === 'Personal') {
            iconSource = focused ? (
              <PersonalActive color="white" fill="blue" size={20} />
            ) : (
              <PersonalUnactive color="white" size={20} />
            );
          } else if (route.name === 'Custom') {
            iconSource = focused ? (
              <Square2StackIconActive color="white" fill="blue" size={20} />
            ) : (
              <Square2StackIconUnactive color="white" size={20} />
            );
          } else if (route.name === 'Story') {
            iconSource = focused ? (
              <Square2StackIconActive color="white" fill="blue" size={20} />
            ) : (
              <Square2StackIconUnactive color="white" size={20} />
            );
          }

          return iconSource;

          // return (
          //   <Image source={iconSource} style={{ width: 20, height: 20 }} />
          // );
        },
        tabBarStyle: {
          backgroundColor: 'black',
          elevation: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: 'white',
      })}
      //
    >
      <Tab.Screen
        name="Training"
        component={StackScreenHome}
        options={{ headerShown: false }}
      />

      {/* <Tab.Screen
        name="Discovery"
        component={StackScreenDiscover}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="Custom"
        component={CustomStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Personal"
        component={StackScreenPersonal}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
