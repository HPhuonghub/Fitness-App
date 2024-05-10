import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Switch,
  ScrollView,
  Modal,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { musiclist } from '@/data';
import Music from '@/components/Music/Music';
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import Colors from '@/constants/Colors';
import axios from 'axios';
import { NETWORK } from '@/data/fitness';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window');
const modalHeight = height * 0.85;

interface myMusic {
  id: number;
  name: string;
  urlImage: string;
  urlMusic: string;
  time: string;
}

type MusicLists = myMusic[];

interface MusicProps {
  visible: boolean;
  onClose: () => void;
  volumeMusic: number;
  musics: (data: myMusic) => void;
  numberMusic: myMusic | null;
  musicLists: MusicLists;
}

const MusicList: React.FC<MusicProps> = ({
  visible,
  onClose,
  volumeMusic,
  musics,
  numberMusic,
  musicLists,
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [showImages, setShowImages] = useState(true);
  const [isCloseButton, setIsCloseButton] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null);
  const [selectedMusicIdWhenDisabled, setSelectedMusicIdWhenDisabled] =
    useState<number | null>(null);
  const [dataSelect, setDataSelect] = useState<any | null>(null);
  const [addMusic, setAddMusic] = useState(false);

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    setShowImages((previousState) => !previousState);
    if (!isEnabled && sound) {
      sound.stopAsync();
      sound.unloadAsync();
      setSound(undefined);
      console.log(
        'check selectedMusicIdWhenDisabled',
        selectedMusicIdWhenDisabled,
      );
      setSelectedMusicIdWhenDisabled(selectedMusic);
    } else if (isEnabled && sound) {
      await sound.playAsync();
    }
  };

  useEffect(() => {
    const handleToggleSwitch = async () => {
      if (!isEnabled && sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(undefined);
        setSelectedMusicIdWhenDisabled(selectedMusic);
      } else if (isEnabled && dataSelect) {
        await handleSelect(dataSelect);
      }
    };

    handleToggleSwitch();
  }, [isEnabled]);

  const handleSelect = async (data: myMusic) => {
    musics(data);
    setSelectedMusic(data.id);
    setDataSelect(data);
    if (sound) {
      await sound.stopAsync();
      setSound(undefined);
    }
    if (isEnabled && data) {
      await playSong(data);
    }
  };

  const closeButton = () => {
    setIsCloseButton(true);
  };

  const addButton = () => {
    setAddMusic(true);
  };

  const [musicList, setMusicList] = useState<MusicLists>([]);

  // useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(`http://${NETWORK}:8080/api/musics`);
  //     setMusicList(res.data);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // fetchData();
  // }, []);

  const convertTimeStringToMillis = (timeString: string): number => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return (minutes * 60 + seconds) * 1000; // Chuyển đổi thành milliseconds
  };

  const playSong = async (song: myMusic) => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(undefined);
      }
      console.log('song', song.urlMusic);
      console.log('Loading Sound');
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.urlMusic },
        {
          shouldPlay: false,
          volume: volumeMusic,
        },
      );
      setSound(newSound);

      console.log('Playing Sound');
      await newSound.playAsync();

      const songDuration = convertTimeStringToMillis(song.time);
      let currentTime = 0;

      const interval = setInterval(() => {
        currentTime += 1000;
        if (currentTime >= songDuration) {
          console.log('Song finished, replaying...');
          clearInterval(interval);
          newSound.replayAsync();
          currentTime = 0;
        }
      }, 1000);
    } catch (error) {
      console.error('Lỗi khi phát nhạc:', error);
    }
  };

  useEffect(() => {
    if (selectedMusicIdWhenDisabled !== null) {
      setSelectedMusic(selectedMusicIdWhenDisabled);
    }
  }, [selectedMusicIdWhenDisabled]);

  useEffect(() => {
    if (
      visible &&
      showImages &&
      musiclist.length > 0 &&
      numberMusic !== null &&
      selectedMusic === null
    ) {
      handleSelect(numberMusic);
    }

    if (isCloseButton && sound) {
      sound.stopAsync();
      sound.unloadAsync();
      setSound(undefined);
      setIsCloseButton(false);
      setSelectedMusic(null);
    }
    setMusicList(musicLists);
    console.log('check musicList', musicList);
  }, [visible, isCloseButton, sound]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={[styles.modalContent, { height: modalHeight }]}>
          <View style={styles.music}>
            <View style={styles.textMusic}>
              <Text style={styles.text}>Music</Text>
            </View>
            <View style={styles.toggleSwitch}>
              <Switch
                trackColor={{ false: '#767577', true: '#0066FF' }}
                thumbColor={isEnabled ? '#0066FF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          {showImages && (
            <ScrollView
              style={{
                flexDirection: 'column',
                marginTop: 100,
                marginBottom: 100,
              }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {musicList.length !== 0 &&
                musicList.map((item, index) => (
                  <View key={item.id}>
                    <Music
                      music={item}
                      onSelect={handleSelect}
                      isSelected={selectedMusic === item.id}
                    />
                  </View>
                ))}
            </ScrollView>
          )}

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: width * 0.8,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                onClose();
                closeButton();
              }}
              style={styles.doneButton}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <TouchableOpacity
                onPress={() => addButton()}
                style={styles.doneButton}
              >
                <Text style={styles.doneButtonText}>+ Add</Text>
              </TouchableOpacity>
            </TouchableOpacity> */}
          </TouchableOpacity>
          {/* {addMusic && <FormMusic updateMusic={handleUpdateMusic}></FormMusic>} */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },

  modalContent: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  music: {
    flex: 1,
    width: width,
    top: 20,
  },

  textMusic: {
    position: 'absolute',
    top: 20,
    left: 20,
  },

  toggleSwitch: {
    position: 'absolute',
    top: 10,
    right: 20,
  },

  text: {
    color: 'white',
  },

  image: {
    width: width,
    height: 80,
  },

  doneButton: {
    backgroundColor: 'rgba(34, 34, 237, 0.88)',
    height: 50,
    width: width * 0.8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },

  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MusicList;
