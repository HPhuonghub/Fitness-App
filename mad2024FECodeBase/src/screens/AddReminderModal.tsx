import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CheckCircleIcon } from 'react-native-heroicons/solid';

const { height, width } = Dimensions.get('window');

interface AddReminderModalProps {
  visible: boolean;
  onClose: () => void;
  onDone: (selectedTime: Date, selectedDays: string[]) => void;
  selectedTime: Date | null;
  selectedDay: string[];
  screenTimeDay: number;
  modalHeight: number;
  updateSelectedTime: string[];
}

const AddReminderModal: React.FC<AddReminderModalProps> = ({
  visible,
  onClose,
  onDone,
  screenTimeDay,
  modalHeight,
  updateSelectedTime,
  selectedTime: selectedTimeProp,
  selectedDay: selectedDayProp,
}) => {
  const [internalSelectedTime, setInternalSelectedTime] = useState<Date>(
    new Date(),
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  const [modalHeights, setModalHeights] = useState(height * 0.4);
  const [internalSelectedDay, setInternalSelectedDay] = useState<string[]>([]);
  const [showDays, setShowDays] = useState(false);

  const [renderTimesCompleted, setRenderTimesCompleted] = useState(false);

  useEffect(() => {
    if (selectedTimeProp) {
      setInternalSelectedTime(selectedTimeProp);
    }
    if (selectedDayProp) {
      setInternalSelectedDay(selectedDayProp);
    }
  }, [selectedTimeProp, selectedDayProp]);

  useEffect(() => {
    if (visible) {
      setDatePickerVisibility(true);
    }
  }, [visible]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setInternalSelectedTime(date);
    if (screenTimeDay === 0) {
      setModalHeights(height * 0.7);
      setShowDays(true);
      console.log('check showDays', showDays);
      setRenderTimesCompleted(true);
    }
    if (screenTimeDay === 1) {
      onDone(date, updateSelectedTime);
      onClose();
    }

    hideDatePicker();
  };

  const handleCancel = () => {
    hideDatePicker();
    onClose();
  };

  const handleDone = () => {
    onDone(internalSelectedTime, internalSelectedDay);
    setShowDays(false);
    setModalHeights(height * 0.4);
    onClose();
  };

  const handleCancelDate = () => {
    setShowDays(false);
    setModalHeights(height * 0.4);
  };

  const renderDays = () => {
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    const toggleDaySelection = (day: string) => {
      if (internalSelectedDay.includes(day)) {
        setInternalSelectedDay(
          internalSelectedDay.filter((selected) => selected !== day),
        );
      } else {
        setInternalSelectedDay([...internalSelectedDay, day]);
      }
    };

    return (
      <View style={styles.daysContainer}>
        <Text style={styles.textRepeat}>Repeat</Text>
        <TouchableOpacity style={{ marginTop: 20 }}>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity key={index} style={styles.day}>
              <TouchableOpacity
                style={styles.formDay}
                onPress={() => toggleDaySelection(day)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.textDay}>{day}</Text>
                  {internalSelectedDay.includes(day) && (
                    <CheckCircleIcon color={'blue'} size={20} />
                  )}
                </View>
                <View style={styles.divider} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      </View>
    );
  };

  const renderTimes = () => {
    return (
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          textColor="#000000"
        />
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            { height: screenTimeDay === 0 ? modalHeights : modalHeight },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              onClose();
              handleCancelDate();
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
          {screenTimeDay === 0 && renderTimes()}
          {screenTimeDay === 0 && showDays && renderDays()}
          {screenTimeDay === 1 && renderTimes()}
          {screenTimeDay === 2 && renderDays()}
          <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeButtonText: {
    color: 'blue',
  },
  doneButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  doneButtonText: {
    color: 'blue',
  },
  daysContainer: {
    flex: 1,
    marginTop: 20,
  },
  day: {
    width: '100%',
  },
  textRepeat: {
    marginTop: 40,
  },

  formDay: {
    marginTop: height * 0.7 * 0.03,
    marginBottom: 7,
  },
  textDay: {
    fontSize: 12,
  },
  divider: {
    marginTop: 5,
    height: 1,
    backgroundColor: 'rgba(192, 192, 192,0.2)',
  },
});

export default AddReminderModal;
