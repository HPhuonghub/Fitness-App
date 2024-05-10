import { StyleSheet, Dimensions } from 'react-native';
import Spacing from '@/constants/Spacing';
import Colors from '@/constants/Colors';

const { height, width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.padding.base,
    marginTop: Spacing.margin.xlg,
    height: height * 0.1,
    backgroundColor: Colors.primary,
  },

  textHeader: {
    color: 'white',
  },

  margin: {
    margin: 15,
  },

  headerArrow: {
    marginTop: 15,
    fontSize: 20,
    color: 'white',
  },

  scrollViewContent: {
    flexGrow: 1,
  },

  textWorkout: {
    color: 'white',
    marginTop: 5,
    fontSize: 20,
  },

  coachVideo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  textCoach: {
    fontSize: 15,
    color: 'white',
  },

  imageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },

  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCoach: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  imageArrow: {
    fontSize: 14,
    marginLeft: 10,
    color: 'grey',
  },

  switchButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageText: {
    marginLeft: 10,
    fontSize: 10,
    color: 'white',
  },

  volumeContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  slider: {
    flex: 1,
    marginHorizontal: 10,
  },

  itemContainer: {
    width: ITEM_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 20,
  },
  item: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
});
