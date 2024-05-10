import { StyleSheet } from 'react-native';
import Spacing from '@/constants/Spacing';
import { Dimensions } from 'react-native';
import Colors from '@/constants/Colors';

const { height, width } = Dimensions.get('window');

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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  textHeader: {
    color: 'white',
  },

  headerArrow: {
    color: 'white',
    fontSize: 20,
  },

  toolbarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 20,
  },
  toolbarItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toolbarArrow: {
    color: 'black',
  },
  divider: {
    height: 1,
    backgroundColor: 'white',
  },
  toolbarText: {
    marginLeft: 5,
    color: 'white',
  },
});
