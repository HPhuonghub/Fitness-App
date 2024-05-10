import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './GeneralSetting.styles';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/solid';
import IconButton from '@/components/IconButton/IconButton';

export function GeneralSetting() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          onPress={() => navigation.navigate('Personality')}
          name="chevron-back"
        />
        <Text style={styles.textHeader}>General Settings</Text>
        <Text />
      </View>

      <TouchableOpacity
        style={styles.toolbarItem}
        onPress={() => navigation.navigate('Reminder')}
      >
        <View style={styles.toolbarItemContent}>
          <Text style={styles.toolbarText}>Reminder</Text>
        </View>
        <ChevronRightIcon color={'white'} size={19}></ChevronRightIcon>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toolbarItem}
        onPress={() => navigation.navigate('Personal')}
      >
        <View style={styles.toolbarItemContent}>
          <Text style={styles.toolbarText}>Restone purchase</Text>
        </View>
        <ChevronRightIcon color={'white'} size={19}></ChevronRightIcon>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toolbarItem}
        onPress={() => navigation.navigate('Personal')}
      >
        <View style={styles.toolbarItemContent}>
          <Text style={styles.toolbarText}>Privacy policy</Text>
        </View>
        <ChevronRightIcon color={'white'} size={19}></ChevronRightIcon>
      </TouchableOpacity>
    </View>
  );
}
