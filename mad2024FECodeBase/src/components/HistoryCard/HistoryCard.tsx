import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { LogHistory } from '@/data';
import { styles } from './HistoryCard.styles';

interface Props {
  history: LogHistory;
}

const HistoryCard: React.FC<Props> = ({ history }) => {
  return (
    <TouchableOpacity style={styles.touchableContainer}>
      <View style={styles.container}>
        <Image source={{ uri: history.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{history.name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Date:</Text>
              <Text style={styles.infoText}>{history.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Duration:</Text>
              <Text style={styles.infoText}>{history.duration}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Calories Burn:</Text>
              <Text style={styles.infoText}>{history.caloriesBurn}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
