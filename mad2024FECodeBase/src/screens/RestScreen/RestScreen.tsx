import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './RestScreen.style';

type RestScreenProps = {
  onSkip: () => void;
  onNext: () => void;
};

export function RestScreen({ onSkip, onNext }: RestScreenProps) {
  const [countdown, setCountdown] = useState(10);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCounting) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            onNext();
            return 10;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCounting, onNext]);

  const handleToggleCounting = () => {
    setIsCounting((prevIsCounting) => !prevIsCounting);
  };

  const handleExtendRest = () => {
    setCountdown((prevCountdown) => prevCountdown + 20);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.restText}>REST</Text>
      <Text style={styles.timeLeft}>
        00: {countdown < 10 ? 0 : ''}
        {countdown}
      </Text>
      <View style={styles.buttons}>
        {/* <TouchableOpacity style={styles.button} onPress={handleToggleCounting}>
          <Text style={styles.buttonText}>
            {isCounting ? 'Pause' : 'Resume'}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={handleExtendRest}>
          <Text style={styles.buttonText}>+20s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSkip}>
          <Text style={styles.buttonText}>Skip Rest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
