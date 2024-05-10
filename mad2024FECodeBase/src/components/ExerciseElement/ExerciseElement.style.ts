import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    // backgroundColor: 'pink',
    // justifyContent: 'space-between',
  },
  content: {
    // flex: 1,
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 40,
  },

  infoText: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },

  infoTimeLeft: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },

  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 350,
  },

  bottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  buttons: {
    flexDirection: 'row',
    borderRadius: 50,
    borderColor: '#A0DEFF',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 15,
    marginBottom: 5,
    // marginTop: 30,
    // gap: 20,
  },

  button: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
  },
});
