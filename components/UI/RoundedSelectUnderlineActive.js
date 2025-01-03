import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';

function RoundedSelectUnderlineActive({ children }) {
  return (
    <View style={{position: 'relative', justifyContent: 'center', height: 52, alignItems: 'center'}}>
      <LinearGradient style={styles.container} colors={[Colors.light_grad_select, Colors.dark_grad_select]} start={[0.4, 0]}>
        {children}
      </LinearGradient>
      <LinearGradient style={styles.container_stroke} colors={[Colors.light_grad_bg_select, Colors.dark_grad_bg_select]} start={[0.4, 0]} />
    </View>
  );
}

export default RoundedSelectUnderlineActive;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    columnGap: 30,
    flexDirection: 'row',
    borderRadius: 16,
    
    zIndex: 1
  },
  container_stroke: {
    position: 'absolute',
    height: 52,
    borderRadius: 16,
    width: '101.5%'
  },
});
