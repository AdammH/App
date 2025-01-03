import { StyleSheet, View, Text, Platform } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

function SelectInput({ identifier, label, data, defaultValue, setUserInfo }) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectOpened, setSelectOpened] = useState(false);

  function selectHandler() {
    setIsFocused(!isFocused);
    setSelectOpened(!selectOpened);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <SelectDropdown
          data={data}
          onSelect={(selectedItem, index) => {
            setUserInfo((current) => {
              return {
                ...current,
                [identifier]: selectedItem,
              };
            });
          }}
          buttonStyle={[styles.input, isFocused ? styles.focusedInput : styles.blurredInput]}
          dropdownStyle={Platform.OS==='android' ? styles.select_container_android : styles.select_container_ios}
          onFocus={() => selectHandler()}
          onBlur={() => selectHandler()}
          defaultButtonText={defaultValue ? defaultValue : data[0]}
          buttonTextStyle={styles.text_style}
          selectedRowTextStyle={styles.selected_text_style}
          rowStyle={styles.row_style}
          rowTextStyle={styles.row_text_style}
          renderDropdownIcon={() => <Ionicons name={selectOpened === false ? 'chevron-down-outline' : 'chevron-up-outline'} color={Colors.gray_color} size={30} />}
        />
      </View>
    </View>
  );
}

export default SelectInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*  height: 85, */
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontFamily: 'poppins-regular',
    marginBottom: 7,
    color: Colors.gray_color,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.input_bg_color,
    borderColor: Colors.input_border_color,
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  text: {
    color: Colors.gray_color,
  },
  focusedInput: {
    backgroundColor: Colors.input_bg_focused_color,
  },
  blurredInput: {
    backgroundColor: Colors.input_bg_color,
  },
  icon: {
    flex: 1,
    position: 'absolute',
    right: 0,
    marginRight: 25,
  },
  pressed: {
    opacity: 0.5,
  },
  select_container_android: {
    backgroundColor: Colors.input_bg_focused_color,
    borderRadius: 16,

  },
  select_container_ios: {
    backgroundColor: Colors.input_bg_focused_color,
    borderRadius: 16,
    
  },
  text_style: {
    color: Colors.gray_color,
    textAlign: 'left',
  },
  selected_text_style: {
    color: Colors.text_color,
  },
  row_style: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.input_border_color,
  },
  row_text_style: {
    color: Colors.text_color,
  },
});
