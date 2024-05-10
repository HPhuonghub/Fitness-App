import {
  useNavigation,
  NavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

interface CompletionScreenProps {
  item: any;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ item }) => {
  const navigation = useNavigation<NavigationContainerRef>();
  console.log('second');
  console.log(item);
  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Training' }],
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://cdn.muscleandstrength.com/sites/default/files/field/feature-wide-image/workout/dumbbell_bodyweight_workout_-_1000x500.jpg',
            }}
            style={styles.image}
          />
          <Text style={styles.congratulationsText}>Workout Completed!</Text>
        </View>
        <Text style={styles.exerciseName}>{item.name || 'Unknown'}</Text>
        <Text style={styles.totalExercise}>
          {item?.customeCollectionDetails?.length ||
            item?.exerciseCollectionDetails?.length}
        </Text>
        <Text style={styles.totalExerciseLabel}>Exercises</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>BACK TO HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 350,
  },
  congratulationsText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 40,
    fontWeight: '900',
  },
  exerciseName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    marginBottom: 30,
  },
  totalExercise: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  totalExerciseLabel: {
    color: '#31363F',
    marginLeft: 10,
    fontSize: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 50,
  },
  buttons: {
    flexDirection: 'row',
    borderRadius: 50,
    borderColor: '#A0DEFF',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 15,
    marginBottom: 5,
    marginHorizontal: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '900',
  },
});

export default CompletionScreen;
