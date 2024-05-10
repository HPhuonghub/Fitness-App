import { View, Text, Dimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { styles } from './CalendarScreen.styles';
import Colors from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import FontSize from '@/constants/FontSize';
import HistoryCard from '@/components/HistoryCard/HistoryCard';
import { LogHistory, histories } from '@/data';

import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { NETWORK } from '@/data/fitness';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CalendarScreen() {
  const [userId, setUserId] = useState(0);

  const [selected, setSelected] = useState('');
  const [records, setRecords] = useState(0); // Khởi tạo records với giá trị ban đầu là 0
  const [kcals, setKcals] = useState(0); // Khởi tạo records với giá trị ban đầu là 0
  const [minutes, setMinutes] = useState(0); // Khởi tạo records với giá trị ban đầu là 0

  const [logs, setLogs] = useState<Log[]>([]); // Khởi tạo logs với kiểu Log[] và giá trị ban đầu là mảng rỗng
  const [historyLogs, setHistoryLogs] = useState<LogHistory[]>([]); // Khởi tạo logs với kiểu Log[] và giá trị ban đầu là mảng rỗng

  interface Log {
    id: number;
    userCollectionDetail: {
      exerciseCollection: ExerciseCollection; // Định kiểu cho thuộc tính chứa ExerciseCollection
    };
    description: string;
    atTime: string;
  }

  interface ExerciseCollection {
    id: number;
    name: string;
    image: string;
    publicity: boolean;
    calories: number;
  }

  const filterLogsBySelectedDate = (
    logs: Log[],
    selectedDate: string,
  ): Log[] => {
    return logs.filter((log) => {
      const logDate = new Date(log.atTime);
      const logDateString = logDate.toISOString().split('T')[0];
      return logDateString === selectedDate;
    });
  };

  // Trong hook useEffect
  useEffect(() => {
    // Kiểm tra xem đã chọn một ngày mới trước khi lọc logs
    if (selected) {
      // Lọc logs cho ngày được chọn
      const logsForSelectedDate = filterLogsBySelectedDate(logs, selected);

      // Tạo historyLogs từ logs đã lọc
      const historyLogsForSelectedDate: LogHistory[] = logsForSelectedDate.map(
        (log) => {
          return {
            id: log.id,
            image: log.userCollectionDetail.exerciseCollection.image,
            name: log.userCollectionDetail.exerciseCollection.name,
            date: log.atTime,
            duration: log.description, // Giả sử giá trị duration mặc định là 0, bạn có thể cập nhật sau
            caloriesBurn: log.userCollectionDetail.exerciseCollection.calories, // Giả sử giá trị caloriesBurnts mặc định là 0, bạn có thể cập nhật sau
          };
        },
      );

      // Cập nhật historyLogs với logs đã lọc và chuyển đổi thành historyLogs
      setHistoryLogs(historyLogsForSelectedDate);
    }
  }, [selected, logs]); // useEffect sẽ chạy lại mỗi khi giá trị của selected hoặc logs thay đổi

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const storedId = await AsyncStorage.getItem('userID');

          if (storedId) {
            const id = parseInt(storedId, 10);
            setUserId(id);

            if (id !== 0) {
              fetchRecords(id);
              fetchKcals(id);
              fetchMinutes(id);
              fetchAllLogs(id);
            } else {
              console.error('User id not found in AsyncStorage');
            }
          } else {
            console.error('User id not found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData(); // Gọi fetchData khi component được mount lại
    }, []), // useEffect sẽ chỉ chạy một lần khi component mount
  );

  // Hàm để gọi API và cập nhật giá trị records
  const fetchRecords = async (userId: number) => {
    try {
      const response = await axios.get(
        `http://${NETWORK}:8080/api/logs/count/${userId}`,
      );

      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const fetchKcals = async (userId: number) => {
    try {
      const response = await axios.get(
        `http://${NETWORK}:8080/api/logs/calories/${userId}`,
      );

      setKcals(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const fetchMinutes = async (userId: number) => {
    try {
      const response = await axios.get(
        `http://${NETWORK}:8080/api/logs/minutes/${userId}`,
      );

      setMinutes(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const fetchAllLogs = async (userId: number) => {
    try {
      console.log('Fetch: ' + userId);
      const response = await axios.get(
        `http://${NETWORK}:8080/api/logs/user/${userId}`,
      );

      const fetchedLogs = response.data;

      fetchedLogs.forEach((log: Log) => {
        const atTimeValue = log.atTime; // Sử dụng dot notation

        console.log('atTime:', atTimeValue);
      });

      setLogs(fetchedLogs);

      console.log(logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // Tạo một hàm để kiểm tra xem ngày có logs hay không
  const isDateWithLogs = (date: Date) => {
    // Lặp qua các logs để kiểm tra xem ngày nào có logs
    for (const log of logs) {
      // Chuyển đổi logDate từ chuỗi thành đối tượng Date
      const logDate = new Date(log.atTime);
      // Nếu ngày của log trùng với ngày đang xét, trả về true
      if (
        logDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
      ) {
        return true;
      }
    }
    // Nếu không có logs cho ngày đó, trả về false
    return false;
  };

  const OverallTab = () => {
    return (
      <View style={styles.panelContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.columnHeader}>Records</Text>
          <Text style={[styles.columnHeader]}>Kcal</Text>
          <Text style={styles.columnHeader}>Time(mins)</Text>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.borderRight]}>
            <Text style={styles.columnCell}>{records}</Text>
          </View>
          <View style={[styles.tableCell, styles.borderRight]}>
            <Text style={styles.columnCell}>{kcals}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.columnCell}>{minutes}</Text>
          </View>
        </View>
      </View>
    );
  };

  // Calendar Tab
  const CalendarTab = () => {
    return (
      <View>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          // Trong phần markedDates của Calendar
          markedDates={{
            // Sử dụng selectedColor để đặt màu của ngày được chọn thành màu xanh biển
            [selected]: {
              selected: true,
              selectedColor: 'blue', // Đặt màu xanh biển cho ngày được chọn
              disableTouchEvent: true,
            },
            // Sử dụng isDateWithLogs để kiểm tra xem ngày nào có logs
            ...logs.reduce((markedDates, log) => {
              const logDate = new Date(log.atTime);
              const logDateString = logDate.toISOString().split('T')[0];
              if (isDateWithLogs(logDate)) {
                // Chỉ đặt màu xanh biển cho các ngày có logs khi chúng không được chọn
                if (selected !== logDateString) {
                  markedDates[logDateString] = {
                    marked: true,
                    dotColor: 'green',
                    selectedColor: 'blue',
                  };
                } else {
                  // Nếu ngày đó được chọn, đặt màu xanh cho ngày được chọn
                  markedDates[logDateString] = {
                    marked: true,
                    dotColor: 'green',
                    selected: true,
                    selectedColor: 'blue',
                  };
                }
              }
              return markedDates;
            }, {} as { [key: string]: { marked: boolean; dotColor: string; selected?: boolean; selectedColor?: string } }), // Thêm chữ ký chỉ mục vào đây
          }}
          theme={{
            calendarBackground: Colors.primary,
            textSectionTitleColor: Colors.text,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.text,
            todayTextColor: Colors.accent,
            dayTextColor: Colors.text,
            dotColor: Colors.primary,
            selectedDotColor: Colors.text,
            arrowColor: Colors.text,
            monthTextColor: Colors.text,
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          style={styles.calendarStyle}
        />
        <View style={styles.historyContainer}>
          <Text
            style={{
              color: Colors.text,
              fontSize: FontSize.xl,
              fontWeight: 'bold',
            }}
          >
            History
          </Text>
          {historyLogs.map((history, index) => (
            <HistoryCard key={index} history={history} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView style={styles.scrollView}>
        <OverallTab></OverallTab>
        <View style={styles.tabContent}>
          <CalendarTab></CalendarTab>
        </View>
      </ScrollView>
    </View>
  );
}
