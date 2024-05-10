import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { AppLoading } from '@/screens/AppLoading/AppLoading';
import Colors from './constants/Colors';
import { ExerciseProvider } from './context/ExerciseContext';

import { RootNavigator } from './navigation';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  let [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <ExerciseProvider>
            <RootNavigator />
          </ExerciseProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    );
  }
};

export default App;
