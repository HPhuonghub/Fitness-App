import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type CustomExerciseProps = {
  setModalVisible: (visible: boolean) => void;
  exercise: any;
  modalVisible: boolean;
  addToAddedExercises: (exercise: any) => void;
};

const CustomExercise: React.FC<CustomExerciseProps> = ({
  setModalVisible,
  exercise,
  modalVisible,
  addToAddedExercises,
}) => {
  const navigation = useNavigation();

  const closeModal = () => {
    setModalVisible(false);
  };

  const addToAdded = () => {
    addToAddedExercises(exercise);
    setModalVisible(false);
    navigation.navigate('AddedExercisesScreen');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            style={{
              flex: 4,
              resizeMode: 'stretch',
              borderRadius: 10,
              borderColor: '#948979',
              borderWidth: 5,
            }}
            source={{ uri: exercise.animation }}
          />
          <View style={styles.exerciseContainer}>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseText}>{exercise.name}</Text>
              <Text style={styles.exerciseDesc}>{exercise.detail}</Text>
            </View>
            <View style={styles.exerciseButtons}>
              <Pressable
                onPress={closeModal}
                style={[styles.exerciseButton, styles.exerciseButtonCancel]}
              >
                <Text style={{ fontWeight: '900' }}>CANCEL</Text>
              </Pressable>
              <Pressable
                onPress={addToAdded}
                style={[styles.exerciseButton, styles.exerciseButtonAdd]}
              >
                <Text style={{ fontWeight: '900', color: 'white' }}>ADD</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
  },

  exerciseContainer: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  exerciseInfo: {},
  exerciseText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  exerciseDesc: {
    fontWeight: '200',
    marginTop: 20,
    marginRight: 30,
    textAlign: 'justify',
    lineHeight: 24,
  },

  exerciseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  exerciseButton: {
    flex: 1,
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: '#31363F',
    borderRadius: 50,
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseButtonAdd: {
    backgroundColor: '#38419D',
    color: 'white',
    fontWeight: '800',
  },
  exerciseButtonCancel: {
    backgroundColor: 'white',
    color: 'black',
    fontWeight: '800',
  },
});

export default CustomExercise;
