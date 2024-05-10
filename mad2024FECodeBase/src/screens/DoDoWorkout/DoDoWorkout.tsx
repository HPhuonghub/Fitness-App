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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { styles } from './DoDoWorkout.styles';
import Screen from '@/components/Screen/Screen';
import axios from 'axios';
import { NETWORK } from '../../data/fitness';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { PencilSquareIcon } from 'react-native-heroicons/outline';
import { TrashIcon } from 'react-native-heroicons/outline';

// Định nghĩa kiểu RouteParams cho route.params
type RouteParams = {
  StartWorkout: {
    item: any; // Kiểu của item phụ thuộc vào cấu trúc của item trong ứng dụng của bạn
  };
};

type Props = {
  navigation: StackNavigationProp<RouteParams>;
};

export function DoDoWorkout({ navigation }: Props) {
  const route = useRoute<RouteProp<RouteParams, 'StartWorkout'>>();
  let { item: initialItem } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [item, setItem] = useState(initialItem);

  const handleStartWorkout = () => {
    navigation.navigate('StartWorkout', { item: item });
  };

  const handleDeleteExercise = (exerciseItem: any) => {
    setSelectedExercise(exerciseItem);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedExercise) return;
    try {
      await axios.delete(
        `http://${NETWORK}:8080/api/custom_collection_details/${selectedExercise.id}`,
      );
      const updatedItem = {
        ...item,
        customeCollectionDetails: item.customeCollectionDetails.filter(
          (exercise: any) => exercise.id !== selectedExercise.id,
        ),
      };
      setItem(updatedItem);
    } catch (error) {
      console.log('Error deleting exercise:', error);
    }
    setShowModal(false);
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'black', flex: 1 }}
      >
        <View style={styles.discoverHeader}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={28}
            color="white"
          />

          <Text style={styles.headerText}>My training</Text>
        </View>
        <View style={styles.customHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <PencilSquareIcon color="#F8EDFF" size={25} />
        </View>
        <View style={styles.wrapper}>
          <View
            style={{
              marginTop: 30,
              gap: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginLeft: 30,
              marginRight: 20,
            }}
          >
            {item?.customeCollectionDetails.map(
              (exerciseItem: any, index: number) => (
                <Pressable
                  key={index}
                  style={styles.exerciseComponent}
                  // onPress={() => openModalWithExercise(item)}
                >
                  <View>
                    <View style={styles.exerciseInfo}>
                      <Image
                        style={{ width: 70, height: 70 }}
                        source={{
                          uri: exerciseItem.exercise.animation,
                        }}
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
                          {exerciseItem.exercise.name}
                        </Text>

                        <Text
                          style={{
                            marginTop: 4,
                            fontSize: 13,
                            color: '#e9a98e',
                          }}
                        >
                          x{exerciseItem.exercise.rep}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TrashIcon
                    color="#F8EDFF"
                    fill="#525CEB"
                    size={32}
                    onPress={() => handleDeleteExercise(exerciseItem)}
                  />
                </Pressable>
              ),
            )}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // paddingBottom: 20,
          borderWidth: 10,
          borderRadius: 30,
          borderStyle: 'solid',
          backgroundColor: '#7469B6',
          marginHorizontal: 40,
          height: 60,
        }}
      >
        <Pressable onPress={() => handleStartWorkout()}>
          <Text
            style={{
              fontWeight: '900',
              color: 'white',
              textAlign: 'center',
            }}
          >
            START
          </Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this exercise?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={[styles.modalButton, { color: 'red' }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
