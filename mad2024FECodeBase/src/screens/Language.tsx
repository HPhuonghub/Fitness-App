import { RootStackParamList } from '@/common/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { CheckCircleIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import Spacing from '@/constants/Spacing';
import IconButton from '@/components/IconButton/IconButton';

const { height, width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;
const Language: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <IconButton
          onPress={() => navigation.navigate('Personality')}
          name="chevron-back"
        />
        <Text style={styles.textHeader}>Language</Text>
        <Text />
      </View>

      <TouchableOpacity>
        <View style={styles.imageContent}>
          <Text style={styles.textCoach}>Tiếng Việt</Text>

          <View style={styles.imageContainer}></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.imageContent}>
          <Text style={styles.textCoach}>English</Text>

          <View style={styles.imageContainer}>
            <CheckCircleIcon color="white" fill="blue" size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Language;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.padding.base,
    marginTop: Spacing.margin.xlg,
    height: height * 0.1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButtonContainer: {
    width: 100,
    alignContent: 'space-between',
  },
  textHeader: {
    color: 'white',
  },
  placeholder: {
    width: 100,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textCoach: {
    fontSize: 12,
    color: 'white',
    marginLeft: 20,
  },
  imageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'grey',
    height: 50,
  },

  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  imageArrow: {
    fontSize: 14,
    marginLeft: 10,
    color: 'grey',
  },
  imageText: {
    marginLeft: 5,
    fontSize: 10,
    color: 'white',
  },
  pencilIcon: {
    marginLeft: 10,
  },
});
