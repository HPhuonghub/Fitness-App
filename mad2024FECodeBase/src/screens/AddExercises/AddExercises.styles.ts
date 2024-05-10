import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    // marginTop: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  wrapper: {
    flexDirection: 'column',
    flex: 1,
    // backgroundColor: 'pink',
  },

  discoverHeader: {
    flexDirection: 'row',
    gap: 20,
    marginLeft: 10,
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
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
    flexDirection: 'row',
    marginLeft: 20,
    // justifyContent: 'space-around',
    gap: 30,
    alignItems: 'center',
    marginBottom: 10,
  },

  exerciseInfo: {
    flexDirection: 'row',
    gap: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
