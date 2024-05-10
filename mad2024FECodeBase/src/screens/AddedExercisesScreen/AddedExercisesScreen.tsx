import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TrashIcon } from 'react-native-heroicons/outline';
import Screen from '@/components/Screen/Screen';
import { styles } from './AddedExercisesScreen.style';
import { useExerciseContext } from '../../context/ExerciseContext';
import axios from 'axios';
import { NETWORK } from '../../data/fitness';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddedExercisesScreen = () => {
  const { addedExercises, setAddedExercises } = useExerciseContext();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [exerciseName, setExerciseName] = useState('');

  const handleDeleteExercise = (index) => {
    const updatedList = [...addedExercises];
    updatedList.splice(index, 1);
    setAddedExercises(updatedList);
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const handleModalSave = async () => {
    const userID = await AsyncStorage.getItem('userID');
    const formattedExercises = addedExercises.map(({ id }) => ({
      exercise: { id },
    }));
    const user = { id: userID };
    const data = {
      customeCollectionDetails: formattedExercises,
      user,
      name: exerciseName,
    };
    console.log(data);
    try {
      const res = axios.post(`http://${NETWORK}:8080/api/custom_collections`, {
        customeCollectionDetails: formattedExercises,
        user,
        name: exerciseName,
      });
      console.log(res.data);
      navigation.navigate('CustomWorkout');
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'black' }}
      >
        <View style={styles.discoverHeader}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back-outline"
              size={28}
              color="white"
            />
            <Text style={styles.headerText}>Added Exercises</Text>
          </View>
          <Pressable onPress={handleSave} style={{ padding: 10 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Save</Text>
          </Pressable>
        </View>

        <Text>List of Added Exercises:</Text>
        <View style={{ marginTop: 30, gap: 20 }}>
          {addedExercises.map((item, index) => (
            <Pressable key={index} style={styles.exerciseComponent}>
              <View style={styles.exerciseInfo}>
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{ uri: item?.animation }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      width: 170,
                      color: 'white',
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{ marginTop: 4, fontSize: 13, color: '#e9a98e' }}
                  >
                    x{item.rep}
                  </Text>
                </View>
              </View>
              <TrashIcon
                color="#F8EDFF"
                fill="#525CEB"
                size={32}
                onPress={() => handleDeleteExercise(index)}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter exercise name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Exercise name"
              value={exerciseName}
              onChangeText={(text) => setExerciseName(text)}
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleModalSave} />
              <Button title="Cancel" onPress={handleCancel} />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

export default AddedExercisesScreen;
