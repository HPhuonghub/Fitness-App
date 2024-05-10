import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import fitness from '../../data/fitness';
import { styles } from './CustomWorkout.styles';
import { ClockIcon as ClockIconSolid } from 'react-native-heroicons/solid';
import { CheckIcon as CheckIconSolid } from 'react-native-heroicons/solid';
import { PlusIcon as PlusIconSolid } from 'react-native-heroicons/solid';
import { XMarkIcon as XMarkIconSolid } from 'react-native-heroicons/solid';
import Screen from '@/components/Screen/Screen';
import axios from 'axios';
import { NETWORK } from '../../data/fitness';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CustomWorkout({ navigation }: { navigation: any }) {
  // const FitnessData = fitness;
  console.log(NETWORK);
  const [customWorkout, setCustomWorkout] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const userID = await AsyncStorage.getItem('userID');
      console.log(`user id: ${userID}`);
      const res = await axios.get(
        `http://${NETWORK}:8080/api/custom_collections/by-user/${userID}`,
      );
      setCustomWorkout(res.data);

      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const handleCustomWorkoutPress = (item: any) => {
    navigation.navigate('DoWorkout', { item: item });
  };

  const handleDeleteConfirmation = async () => {
    console.log('Xóa item với id:', selectedItemId);
    try {
      const res = axios.delete(
        `http://${NETWORK}:8080/api/custom_collections/${selectedItemId}`,
      );
      console.log(res.data);
      fetchData();
    } catch (error) {
      console.log(error);
    }

    setShowDeleteModal(false);
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

            <Text style={styles.headerText}>My training</Text>
          </View>

          <View style={styles.introductionContainer}>
            <View style={styles.introductionIcon}>
              <CheckIconSolid size={25} color="#f1ebdb" />
            </View>
            <Text style={styles.introductionText}>
              Customize your own training plans based on your preference
            </Text>
          </View>
          {customWorkout.length === 0 ? (
            <View style={styles.addExercises}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddExercise')}
              >
                <View style={styles.addIcon}>
                  <PlusIconSolid size={25} color="#f1ebdb" />
                </View>
              </TouchableOpacity>
              <Text style={styles.addExerciseText}>Add exercises</Text>
            </View>
          ) : (
            <View style={[styles.addExercise]}>
              <View style={styles.customUserWorkout}>
                {customWorkout.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleCustomWorkoutPress(item)}
                  >
                    <View key={index} style={styles.customUserWorkoutComponent}>
                      <View style={styles.customUserWorkoutInfo}>
                        <View style={styles.customUserWorkoutLeftIcon}>
                          <ClockIconSolid
                            color="#F8EDFF"
                            fill="#525CEB"
                            size={32}
                          />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: 'bold',
                              width: 170,
                              color: 'white',
                            }}
                          >
                            {item?.name}
                          </Text>

                          <Text
                            style={{
                              marginTop: 4,
                              fontSize: 13,
                              color: '#e9a98e',
                            }}
                          >
                            {item?.customeCollectionDetails.length} exercises
                          </Text>
                        </View>
                      </View>
                      <XMarkIconSolid
                        color="#F8EDFF"
                        fill="#F8EDFF"
                        size={22}
                        onPress={() => {
                          setSelectedItemId(item.id);
                          setShowDeleteModal(true);
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddExercise')}
                style={styles.addExerciseIcon}
              >
                <View style={[styles.addIcon]}>
                  <PlusIconSolid size={25} color="#f1ebdb" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal Xác nhận Xóa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Bạn có chắc chắn muốn xóa không?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                style={[styles.button, { backgroundColor: 'blue' }]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteConfirmation}
                style={[styles.button, { backgroundColor: 'red' }]}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
