import { RootStackParamList } from '@/common/types';
import { workouts } from '@/data';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'DoExercise'>;

const DoExercise: React.FC<Props> = ({
  navigation: { goBack },
}) =>  {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [exercises] = useState<{ name: string; reps: number }[]>([
    { name: 'Push-up', reps: 10 },
    { name: 'Squat', reps: 15 },
    { name: 'Lunges', reps: 12 },
    // Danh sách các bài tập khác
  ]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [isCounting, setIsCounting] = useState<boolean>(false); // State mới

  const navigate = useNavigation();

  useEffect(() => {
    if (isCounting) {
      startTimer();
    } else {
      clearInterval(timer as NodeJS.Timeout);
    }
    //return () => clearInterval(timer as NodeJS.Timeout);
  }, [currentExerciseIndex, isCounting]);

  const startTimer = () => {
    let newTimer = setInterval(() => tick(), 1000);
    setTimer(newTimer);
  };

  const tick = () => {
    setTimeRemaining(prevTime => {
      if (prevTime > 0) {
        return prevTime - 1;
      } else {
        clearInterval(timer as NodeJS.Timeout);
        if (currentExerciseIndex < exercises.length - 1) {
          setTimeout(() => {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setTimeRemaining(60);
            setIsCounting(false); // Tạm dừng đếm thời gian
          }, 0);
        } else {
          // alert('Buổi tập kết thúc!');
        }
        return prevTime;
      }
    });
  };
  

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const completeExercise = () => {
      setIsCounting(!isCounting);
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      clearInterval(timer as NodeJS.Timeout);
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setTimeRemaining(60);
      setIsCounting(false); // Tạm dừng đếm thời gian
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      clearInterval(timer as NodeJS.Timeout);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimeRemaining(60);
      setIsCounting(false); // Tạm dừng đếm thời gian
    }
  };

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>

      <View style={styles.gifContainer}>
            <Image source={{uri: 'https://media.giphy.com/media/pZ2U9WUs4AZa/giphy.gif'}} style={styles.gif} />
          </View>

      <View style={styles.exerciseContainer}>
        <View style={styles.blackBackground}>
          <Text style={styles.exerciseName}>{currentExercise.name}</Text>
          <Text style={styles.exerciseReps}>x{currentExercise.reps}</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.buttonGray}
              onPress={previousExercise}
            >
              <Text style={styles.buttonText}>&lt;----</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonGreen}
              onPress={completeExercise}
            >
              {isCounting? <Text style={[styles.buttonText]}>&#x2759; &#x2759;</Text> :  <Text style={[styles.buttonText]}>&#x25B6;</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonGray}
              onPress={nextExercise}
            >
              <Text style={styles.buttonText}>----&gt;</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    backgroundColor: 'gray',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent', // Set background color to transparent
  },
  timerText: {
    fontSize: 40,
    top:120,
    color: 'black', // Change the color as needed
  },
  exerciseContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  blackBackground: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    height:"30%",
  },
  exerciseName: {
    fontSize: 30,
    fontWeight:"bold",
    color: 'white',
    marginBottom:20
  },
  exerciseReps: {
    fontSize: 60,
    color: 'white',
    fontWeight:"bold",
  },
  gifContainer: {
    position: 'absolute',
    top: -100,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center', // Can giữa theo chiều dọc
    alignItems: 'center', // Can giữa theo chiều ngang
  },
  gif: {
    width: 400, // Chiều rộng là 80% của parent
    height: 400, // Chiều cao tối đa là 80% chiều cao của màn hình
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom:-20,
  },
  buttonGray: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 5,
    flex:1,
    alignItems: 'center',
  },
  buttonGreen: {
    backgroundColor: '#0066FF',
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 5,
    width:"50%",
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DoExercise;
