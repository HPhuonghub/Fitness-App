import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Screen from '@/components/Screen/Screen';
import { styles } from './ExerciseElement.style';

interface ExerciseElementProps {
  exercise: {
    exercise: {
      name: string;
      animation: string;
    };
  };
  timer: number;
  onFinish: () => void;
  onNext: () => void;
}

export function ExerciseElement({
  exercise,
  timer,
  onFinish,
  onNext,
}: ExerciseElementProps) {
  const [countdown, setCountdown] = useState(timer);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCounting) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval); // Dừng interval khi countdown = 0
            onFinish(); // Kết thúc bài tập khi countdown = 0
            return timer; // Đặt lại countdown thành timer của bài tập mới
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCounting, timer, onFinish]);

  const handleToggleCounting = () => {
    setIsCounting((prevIsCounting) => !prevIsCounting);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: exercise.exercise.animation,
            }}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.info}>
          <Text style={styles.infoText}>{exercise.exercise.name}</Text>
          <Text style={styles.infoTimeLeft}>
            Time left: {countdown} seconds
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleToggleCounting}
          >
            <Text style={styles.buttonText}>
              {isCounting ? 'Pause' : 'Resume'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onNext}>
            <Text style={styles.buttonText}>Next Exercise</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
