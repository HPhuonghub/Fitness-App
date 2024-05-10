import { RootStackParamList } from '@/common/types';
import Button from '@/components/Button/Button';
import Screen from '@/components/Screen/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import IconButton from '@/components/IconButton/IconButton';
import Spacing from '@/constants/Spacing';

const { height, width } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;
const Favorites: React.FC<Props> = ({ navigation }) => {
  const [activeItem, setActiveItem] = useState<string>('Item1'); // State lưu trạng thái của item được chọn

  // Hàm xử lý khi nhấn vào item
  const handleItemPress = (item: string) => {
    setActiveItem(item); // Đặt item được chọn thành activeItem
    // Thực hiện các hành động khác nếu cần
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <IconButton
          onPress={() => navigation.navigate('Personality')}
          name="chevron-back"
        />
        <Text style={styles.textHeader}>Favorites</Text>
        <Text />
      </View>

      {/* Dưới thanh header */}
      <View style={styles.bottomMenu}>
        {/* Item 1 */}
        <TouchableOpacity
          style={[styles.menuItem, activeItem === 'Item1' && styles.activeItem]} // Nếu item được chọn, thêm hiệu ứng active
          onPress={() => handleItemPress('Item1')}
        >
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>

        {/* Item 2 */}
        <TouchableOpacity
          style={[styles.menuItem, activeItem === 'Item2' && styles.activeItem]}
          onPress={() => handleItemPress('Item2')}
        >
          <Text style={styles.menuText}>Recent</Text>
        </TouchableOpacity>

        {/* Item 3 */}
        <TouchableOpacity
          style={[styles.menuItem, activeItem === 'Item3' && styles.activeItem]}
          onPress={() => handleItemPress('Item3')}
        >
          <Text style={styles.menuText}>Favorite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Favorites;

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

  textHeader: {
    color: 'white',
  },

  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'black',
  },
  menuItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent', // Màu đuôi mặc định
  },
  activeItem: {
    borderBottomColor: 'blue', // Màu đuôi khi item được chọn
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
