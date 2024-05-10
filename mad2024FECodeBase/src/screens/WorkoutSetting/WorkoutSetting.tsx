import { styles } from './WorkoutSetting.styles';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  ImageSourcePropType,
} from 'react-native';
import Slider from '@react-native-community/slider';
// @ts-ignore
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import CoachVoice from '@/components/CoachVoice/CoachVoice';
import { coachvoices } from '@/data';
import IconButton from '@/components/IconButton/IconButton';
import Colors from '@/constants/Colors';
import axios from 'axios';
import { NETWORK } from '@/data/fitness';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicList from '../Music/MusicList';

interface myMusic {
  id: number;
  name: string;
  urlImage: string;
  urlMusic: string;
  time: string;
}

type MusicLists = myMusic[];

export function WorkoutSetting() {
  const navigation = useNavigation();

  const [volumeMusic, setVolumeMusic] = useState(0.5);
  const [volumeVoice, setVolumeVoice] = useState(0.5);
  const [volumeSound, setVolumeSound] = useState(0.5);
  const [isEnabled1, setIsEnabled1] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  const [previousVolume, setPreviousVolume] = useState<number | null>(null);
  const [sliderDisabled, setSliderDisabled] = useState(false);

  const [previousSound, setPreviousSound] = useState<number | null>(null);
  const [sliderDisabled1, setSliderDisabled1] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  0;
  const [dataSelect, setDataSelect] = useState<myMusic | null>(null);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      setPreviousVolume(volumeVoice); // Save current volume value
      setVolumeVoice(0); // Set volume to 0
      setSliderDisabled(true); // Disable slider
    } else {
      // If switch is turned on
      setVolumeVoice(previousVolume !== null ? previousVolume : 0.5); // Restore previous volume value or set to default
      setSliderDisabled(false); // Enable slider
    }
  };

  const toggleSwitch1 = () => {
    setIsEnabled1((previousState) => !previousState);
    if (isEnabled1) {
      setPreviousSound(volumeSound); // Save current Sound value
      setVolumeSound(0); // Set Sound to 0
      setSliderDisabled1(true); // Disable slider
    } else {
      // If switch is turned on
      setVolumeSound(previousSound !== null ? previousSound : 0.5); // Restore previous volume value or set to default
      setSliderDisabled1(false); // Enable slider
    }
  };

  const [musicList, setMusicList] = useState<MusicLists>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://${NETWORK}:8080/api/musics`);
        setMusicList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const textOpacity = useRef(new Animated.Value(1)).current;

  const handleScroll = (event: any) => {
    const offsetY: number = event.nativeEvent.contentOffset.y;
    Animated.timing(textOpacity, {
      toValue: offsetY === 0 ? 0 : 1,
      duration: 1,
      useNativeDriver: true,
    }).start();
  };

  const [selectedCoachVoice, setSelectedCoachVoice] = useState<number | null>(
    null,
  );

  const handleSelect = (id: number) => {
    setSelectedCoachVoice(id);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setDataSelect(dataSelect);
  }, [dataSelect]);

  const handleMusic = async (data: any) => {
    // Lấy giá trị từ AsyncStorage
    const userID = await AsyncStorage.getItem('userID');

    console.log('User ID:', userID);
    setDataSelect(data);
  };

  var numberMusic: myMusic | null =
    dataSelect || (musicList.length > 0 ? musicList[0] : null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          onPress={() => navigation.navigate('Personality')}
          name="chevron-back"
        />
        <Animated.Text style={[styles.textHeader, { opacity: textOpacity }]}>
          Workout Settings
        </Animated.Text>
        <View />
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        <View
          style={{
            backgroundColor: Colors.primary,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <View style={styles.margin}>
            <Text style={styles.textWorkout}>Workout Settings</Text>
            <View style={styles.coachVideo}>
              <Text style={styles.textCoach}>Coach Video</Text>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.imageCoach}
                  source={require('../../assets/images/voices/workout1.webp')}
                />
                <Text style={styles.imageArrow}>&gt;</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={styles.margin}>
              <View style={styles.imageContent}>
                <Text style={styles.textCoach}>Music</Text>

                <View style={styles.imageContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      style={styles.imageCoach}
                      source={{ uri: numberMusic?.urlImage }}
                    />
                    <Text style={styles.imageText}>{numberMusic?.name}</Text>
                  </View>

                  <Text style={styles.imageArrow}>&gt;</Text>
                </View>
              </View>
              <View style={styles.volumeContainer}>
                <FontAwesome5 name="volume-off" size={16} color="gray" />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={volumeMusic}
                  onValueChange={setVolumeMusic}
                  minimumTrackTintColor="#007bff"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#007bff"
                />
                <FontAwesome5 name="volume-up" size={16} color="gray" />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={closeModal}>
            <MusicList
              visible={modalVisible}
              volumeMusic={volumeMusic}
              musics={handleMusic}
              musicLists={musicList}
              numberMusic={numberMusic}
              onClose={() => setModalVisible(false)}
            />
          </TouchableWithoutFeedback>
        </View>

        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <View style={styles.margin}>
              <View style={styles.imageContent}>
                <Text style={styles.textCoach}>Voice Guide</Text>

                <View>
                  <Switch
                    trackColor={{ false: '#767577', true: '#0066FF' }}
                    thumbColor={isEnabled ? '#0066FF' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>

              <View style={styles.volumeContainer}>
                <FontAwesome5 name="volume-off" size={16} color="gray" />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={volumeVoice}
                  onValueChange={setVolumeVoice}
                  minimumTrackTintColor="#007bff"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#007bff"
                  disabled={sliderDisabled}
                />
                <FontAwesome5 name="volume-up" size={16} color="gray" />
              </View>
            </View>

            <View style={styles.margin}>
              <View style={styles.imageContent}>
                <Text style={styles.textCoach}>Coach Voice</Text>

                <View style={styles.imageContainer}>
                  <Text style={styles.imageText}>Thomas</Text>
                </View>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              pagingEnabled
              snapToInterval={200}
              style={styles.margin}
            >
              {coachvoices.map((coachvoice) => (
                <CoachVoice
                  key={coachvoice.id}
                  coachvoice={coachvoice}
                  onSelect={handleSelect}
                  isSelected={selectedCoachVoice === coachvoice.id}
                />
              ))}
            </ScrollView>

            <View style={styles.margin}>
              <View style={styles.imageContent}>
                <Text style={styles.textCoach}>Sound Effect</Text>

                <View>
                  <Switch
                    trackColor={{ false: '#767577', true: '#0066FF' }}
                    thumbColor={isEnabled1 ? '#0066FF' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch1}
                    value={isEnabled1}
                  />
                </View>
              </View>

              <View style={styles.volumeContainer}>
                <FontAwesome5 name="volume-off" size={16} color="gray" />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={volumeSound}
                  onValueChange={setVolumeSound}
                  minimumTrackTintColor="#007bff"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#007bff"
                  disabled={sliderDisabled1}
                />
                <FontAwesome5 name="volume-up" size={16} color="gray" />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.ScrollView>
    </View>
  );
}
