import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    touchableContainer: {
      marginVertical: 10,
      backgroundColor: Colors.primary,
      borderRadius: 10,
    },
    container: {
      flexDirection: 'row',
      minWidth: screenWidth * 0.9,
      alignItems: 'center', // Căn giữa theo chiều dọc
    },
    image: {
      width: 100,
      height: 100,
      margin: 10,
    },
    detailsContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 20,
    },
    name: {
      fontSize: FontSize.md + 2,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    infoContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginVertical: 5,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoTitle: {
      fontSize: FontSize.base,
      color: 'white',
      fontWeight: 'bold',
      marginRight: 5,
    },
    infoText: {
      fontSize: FontSize.base,
      color: 'white',
    },
});
