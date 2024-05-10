import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  formContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: height * 0.6,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  formText: {
    marginTop: 15,
  },
  textLogin: {
    fontSize: 30,
    color: 'black',
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  passwordContainer: {
    flexDirection: 'column',
    height: height * 0.2,
    marginTop: 10,
  },
  passwordRegisterContainer: {
    flexDirection: 'column',
    height: height * 0.1,
    marginTop: 10,
  },
  againPasswordContainer: {
    flexDirection: 'column',
    height: height * 0.1,
    marginBottom: 50,
  },

  inputPasswordContainer: {
    position: 'relative',
  },
  inputPassword: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    paddingRight: 40,
    borderRadius: 15,
    paddingLeft: 12,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 10,
    justifyContent: 'center',
  },
  formButtonText: {
    // backgroundColor: 'blue',
    marginBottom: 20,
    height: height * 0.12,
  },
  formButton: {
    width: width * 0.8,
    backgroundColor: 'black',
    borderRadius: 40,
  },
});
