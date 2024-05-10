import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Switch,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import AddReminderModal from './AddReminderModal';
import Spacing from '@/constants/Spacing';
import IconButton from '@/components/IconButton/IconButton';
import { spacing } from '@/theme';
import Colors from '@/constants/Colors';

type RootStackParamList = {
  Reminder: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Reminder'>;

const { height, width } = Dimensions.get('window');

const Reminder: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReminderIndex, setSelectedReminderIndex] =
    useState<number>(-1);
  const [reminders, setReminders] = useState<{ time: Date; days: string[] }[]>(
    [],
  );
  const [isEnabled, setIsEnabled] = useState(true);
  const [screenTimeDay, setscreenTimeDay] = useState<number>(0);
  const [modalHeight, setmodalHeight] = useState(height * 0.4);
  const [updateSelectedTime, setUpdateSelectedTime] = useState<string[]>([]);
  const [edit, setEdit] = useState(false);
  const [tempWidth, setTempWidth] = useState(width);
  const [switchStates, setSwitchStates] = useState(
    Array(reminders.length).fill(true),
  );

  const handleDone = (selectedTime: Date, selectedDays: string[]) => {
    if (selectedReminderIndex !== -1) {
      const updatedReminders = [...reminders];
      updatedReminders[selectedReminderIndex] = {
        time: selectedTime,
        days: selectedDays,
      };
      setReminders(updatedReminders);
    } else {
      setReminders([...reminders, { time: selectedTime, days: selectedDays }]);
    }
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setscreenTimeDay(0);
    setSelectedReminderIndex(-1);
  };

  const editReminderTime = (index: number) => {
    setSelectedReminderIndex(index);
    setscreenTimeDay(1);
    setmodalHeight(height * 0.4);
    setUpdateSelectedTime([...reminders[index].days]);
    console.log('check updateSelectedTime:', updateSelectedTime);
    setModalVisible(true);
  };

  const editReminderDay = (index: number) => {
    setSelectedReminderIndex(index);
    setscreenTimeDay(2);
    setmodalHeight(height * 0.7);
    setModalVisible(true);
  };

  const handleEdit = () => {
    setEdit((previousState) => !previousState);
    setTempWidth(edit ? width : width * 0.75);
  };

  const toggleSwitch = (index: number) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setSwitchStates(newSwitchStates);
  };

  const handleDelete = (index: number) => {
    setReminders((prevReminders) =>
      prevReminders.filter((_, i) => i !== index),
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <IconButton onPress={() => navigation.goBack()} name="chevron-back" />
        <Text style={styles.textHeader}>Reminder</Text>
        {reminders.length === 0 ? (
          <View></View>
        ) : (
          <Text style={{ color: 'blue' }} onPress={() => handleEdit()}>
            {edit ? 'Done' : 'Edit'}
          </Text>
        )}
      </View>
      <ScrollView
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.content}>
          {reminders.map((reminder, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginTop: 10,
                flexDirection: 'row',
                backgroundColor: Colors.primary,
                height: height * 0.13,
              }}
            >
              <TouchableOpacity style={{ width: tempWidth }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: Spacing.padding.base,
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity onPress={() => editReminderTime(index)}>
                    <Text
                      style={{
                        color: switchStates[index] ? '#ccc' : 'grey',
                        marginLeft: 5,
                        fontSize: 30,
                      }}
                    >
                      {reminder.time.toLocaleTimeString()}
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <Switch
                      trackColor={{ false: '#767577', true: '#0066FF' }}
                      thumbColor={switchStates[index] ? '#0066FF' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => toggleSwitch(index)}
                      value={switchStates[index]}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      height: 1,
                      width: width * 0.05,
                    }}
                  ></View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: 'white',
                      width: width * 0.95,
                      marginTop: 5,
                    }}
                  ></View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: Spacing.margin.base,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: Spacing.padding.xlg,
                  }}
                >
                  <Text
                    style={{
                      color: switchStates[index] ? '#ccc' : 'grey',
                    }}
                  >
                    Repeat remind me
                  </Text>
                  <TouchableOpacity onPress={() => editReminderDay(index)}>
                    <Text
                      style={{
                        color: switchStates[index] ? '#ccc' : 'grey',
                      }}
                    >
                      {reminder.days.length === 7
                        ? 'Everyday'
                        : reminder.days.length === 0
                        ? 'Select'
                        : reminder.days.length === 1
                        ? reminder.days[0]
                        : `${reminder.days[0]}, ...`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {edit && (
                <TouchableOpacity
                  onPress={() => handleDelete(index)}
                  style={styles.formDelete}
                >
                  <Text style={styles.buttonDelete}>Delete</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.backgroundButton}>
        <View style={styles.formButton}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}> + Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={closeModal}>
        <View>
          <AddReminderModal
            visible={modalVisible}
            onClose={closeModal}
            onDone={handleDone}
            modalHeight={modalHeight}
            updateSelectedTime={updateSelectedTime}
            screenTimeDay={screenTimeDay}
            selectedTime={
              selectedReminderIndex !== -1
                ? reminders[selectedReminderIndex].time
                : null
            }
            selectedDay={
              selectedReminderIndex !== -1
                ? reminders[selectedReminderIndex].days
                : []
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Reminder;

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

  toggleSwitch: {
    position: 'absolute',
    top: 10,
    right: 20,
  },

  textHeader: {
    color: 'white',
  },

  placeholder: {
    width: 100,
  },

  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formDelete: {
    backgroundColor: 'red',
    height: height * 0.13,
    width: width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDelete: {},

  backgroundButton: {
    width: width,
    backgroundColor: '#000',
    position: 'relative',
    height: height * 0.1,
  },

  formButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  addButton: {
    width: width * 0.9,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
