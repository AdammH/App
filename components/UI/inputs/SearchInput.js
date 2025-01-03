import { TextInput, Pressable, StyleSheet, Animated, View } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';

function SearchInput({ headerFunction, wide }) {
  const [wideInput, setWideInput] = useState(wide === true ? true : false);

  const wideAnim = useRef(new Animated.Value(36)).current;

  const extendWidth = () => {
    Animated.timing(wideAnim, {
      toValue: 250,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const reduceWidth = () => {
    Animated.timing(wideAnim, {
      toValue: 36,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animationStyle = {
    width: wideAnim,
  };

  function inputWidthHandler() {
    if (headerFunction) {
      headerFunction(wideInput);
    }

    setWideInput(!wideInput);
    if (wideInput === true) {
      reduceWidth();
    } else {
      extendWidth();
    }
  }

  return (
    <Pressable
      onPress={
        wide != true
          ? inputWidthHandler
          : () => {
              return;
            }
      }
      style={styles.roundedButton}
    >
      <Animated.View style={[styles.roundedButton, wide === true ? { width: '100%' } : animationStyle]}>
        <LinearGradient
          colors={[wideInput === true ? Colors.dark_round_btn_green : Colors.light_round_btn_green, Colors.dark_round_btn_green]}
          style={[styles.roundedButton, styles.search, wideInput === true && { borderColor: Colors.border_round_btn, borderWidth: 2, borderRadius: 14 }]}
        >
          <Ionicons name="search-outline" size={20} color={Colors.icon_gray_color} />
          {wideInput == true && <TextInput style={styles.input} placeholder="Search" placeholderTextColor={Colors.placeholder_round_btn} />}
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default SearchInput;

const styles = StyleSheet.create({
  roundedButton: {
    height: 36,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    justifyContent: 'flex-start',
    width: '100%',
  },
  input: {
    width: '85%',
    color: Colors.text_color,
    marginLeft: 8,
  },
});
