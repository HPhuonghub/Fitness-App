import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    // marginTop: 50,
    // flexGrow: 1,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  wrapper: {
    flexDirection: 'column',
    flex: 1,
    // backgroundColor: 'pink',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },

  discoverHeader: {
    flexDirection: 'row',
    gap: 20,
    marginLeft: 10,
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#EEEEEE',
  },

  headerText: {
    color: '#fff',
    fontSize: 20,
  },

  introductionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    marginHorizontal: 15,
    // backgroundColor: '#76ABAE',
  },

  introductionText: {
    flex: 10,
    color: '#fff',
  },
  introductionIcon: {
    flex: 2,
  },
  addExercise: {
    flex: 10,
    // flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    gap: 10,
    // backgroundColor: '#fff',
  },

  addExercises: {
    flex: 10,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    // backgroundColor: '#fff',
  },

  addExerciseIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },

  customUserWorkout: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    gap: 20,
    // backgroundColor: 'blue',
  },

  customUserWorkoutComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
  },

  customUserWorkoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customUserWorkoutLeftIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    padding: 15,
    backgroundColor: '#BFCFE7',
  },

  addIcon: {
    borderWidth: 1,
    borderColor: '#f1ebdb',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#69c1a9',
  },
  addExerciseText: {
    color: '#fff',
    fontSize: 20,
  },

  text: {
    color: '#fff',
  },

  exerciseComponent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  exerciseInfo: {
    flexDirection: 'row',
  },

  itemName: {
    color: '#B5C18E',
    fontSize: 19,
    fontWeight: '800',
  },

  customHeader: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customElement: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
