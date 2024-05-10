import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Font from '@/constants/Font';
import Spacing from '@/constants/Spacing';
import AppText from '@/components/AppText/AppText';
import Colors from '@/constants/Colors';
import { CoachVoice as CoachVoiceType } from '@/data';

interface Props {
  coachvoice: CoachVoiceType;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

const CoachVoice: React.FC<Props> = ({ coachvoice, onSelect, isSelected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.coachVoiceItem,
        isSelected && styles.selected,
        styles.content,
      ]}
      onPress={() => onSelect(coachvoice.id)}
    >
      <Image source={coachvoice.image} style={styles.image} />
      <View style={styles.item}>
        <Text style={styles.text}>{coachvoice.name}</Text>
        <Text style={styles.text}>{coachvoice.national}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CoachVoice;

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.primary,
    marginRight: Spacing.margin.lg,
    borderRadius: Spacing.borderRadius.base,
    overflow: 'hidden',
    width: 200,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 15,
  },

  item: {
    marginLeft: 10,
  },

  text: {
    color: 'white',
    fontSize: 10,
  },

  coachVoiceItem: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
  },
  selected: {
    borderColor: 'blue',
  },
});
