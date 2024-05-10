import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { styles } from './StartWorkout.styles';
import Screen from '@/components/Screen/Screen';
import axios from 'axios';
import { NETWORK } from '../../data/fitness';
import { ExerciseElement } from '@/components/ExerciseElement/ExerciseElement';
import { RestScreen } from '../RestScreen/RestScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, View } from 'react-native';
import CompletionScreen from '../CompleteScreen/CompletionScreen ';
import { Ionicons } from '@expo/vector-icons';

type RouteParams = {
  StartWorkout: {
    item: any;
  };
};

type Props = {
  navigation: StackNavigationProp<RouteParams>;
};

export function StartWorkout({ navigation }: Props) {
  const route = useRoute<RouteProp<RouteParams, 'StartWorkout'>>();
  const { item } = route.params;
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFinishExercise = () => {
    if (currentExerciseIndex < item.customeCollectionDetails.length - 1) {
      setIsResting(true);
    } else {
      console.log('Bạn đã hoàn thành tất cả các bài tập');
      setIsCompleted(true);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < item.customeCollectionDetails.length - 1) {
      setIsResting(true);
    } else {
      console.log('Bạn đã hoàn thành tất cả các bài tập');
      setIsCompleted(true);
    }
  };

  const handleSkipRest = () => {
    setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
    setIsResting(false);
  };

  const handleNext = () => {
    setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
    setIsResting(false);
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <View style={styles.discoverHeader}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back-outline"
              size={28}
              color="white"
            />

            {/* <Text style={styles.headerText}>My training</Text> */}
          </View>
          {isCompleted ? (
            <CompletionScreen item={item} /> // Hiển thị màn hình hoàn thành khi isCompleted là true
          ) : isResting ? (
            <RestScreen onSkip={handleSkipRest} onNext={handleNext} />
          ) : (
            <ExerciseElement
              exercise={item.customeCollectionDetails[currentExerciseIndex]}
              timer={
                item.customeCollectionDetails[currentExerciseIndex].exercise
                  .timer
              } ////////////////////////////////////
              onFinish={handleFinishExercise}
              onNext={handleNextExercise}
            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
