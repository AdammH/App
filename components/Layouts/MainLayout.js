import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';

function MainLayout({ children, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.go_back_btn_container}>
        <Pressable onPress={onPress} style={styles.icon_container}>
          <Ionicons name="chevron-back-outline" color={Colors.chevron_back_gray_color} size={30} />
        </Pressable>
      </View>
      {children}
    </View>
  );
}

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
    flexDirection: 'column',
  },
  go_back_btn_container: {
    height: 80,
    justifyContent: 'center',
  },
  icon_container: {
    width: 30,
  },
});
