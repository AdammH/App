import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../constants/colors';

function ScreenHeaderLayout({ children, mainHeader, style }) {
  return (
    <View style={[styles.image_container, style ? style : null]}>
      <View style={styles.header_container}>
        <Text style={styles.header}>{mainHeader}</Text>
      </View>
      {children}
    </View>
  );
}

export default ScreenHeaderLayout;

const styles = StyleSheet.create({
  image_container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  header_container: {
    marginTop: 30,
    justifyContent: 'center',
    zIndex: 1000,
  },
  header: {
    color: Colors.text_color,
    fontFamily: 'poppins-semi-bold',
    fontSize: 24,
    textAlign: 'center',
  },
});
