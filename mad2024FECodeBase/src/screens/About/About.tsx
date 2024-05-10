import { View, Text, Button, Touchable, Pressable } from 'react-native';
import { styles } from './About.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';

type AboutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'About'>;

interface AboutProps {
  navigation: AboutScreenNavigationProp;
}

export function About({ navigation }: AboutProps) {
  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      {/* <Pressable onPress={() => navigation.navigate('Home')}>
        <Text
          style={{
            padding: 10,
            backgroundColor: 'lightblue',
            borderRadius: 50,
            width: 150,
            textAlign: 'center',
          }}
        >
          Go to Home
        </Text>
      </Pressable> */}
    </View>
  );
}

