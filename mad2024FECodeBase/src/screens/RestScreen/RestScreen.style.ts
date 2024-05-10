import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    // backgroundColor: 'pink',
  },

  restText: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },

  timeLeft: {
    fontSize: 55,
    fontWeight: '900',
    color: 'white',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F57D1F',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
  },
});
