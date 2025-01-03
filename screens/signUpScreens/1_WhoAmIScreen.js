import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import ScreenHeaderLayout from '../../components/Layouts/ScreenHeader';
import Colors from '../../constants/colors';
import Input from '../../components/UI/inputs/Input';
import SelectInput from '../../components/UI/inputs/SelectInput';
import DatePickerInput from '../../components/UI/DatePicker';
import GradientBackground from '../../components/UI/GradientBackground';
import WhoAmIImage from '../../assets/whoAmI-image.svg';

function FirstSignUpScreen({ value, onPress, setUserInfo, userInfo }) {
  const gender = ['Male', 'Female'];
  const countries = ['Belgium', 'USA', 'Slovakia'];
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  function inputHandler(inputIdentifier, enteredValue) {
    setUserInfo((current) => {
      return {
        ...current,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  return (
    <View style={styles.container}>
      <ScreenHeaderLayout mainHeader={'Who am I'}>
        <SvgXml xml={WhoAmIImage} height={windowHeight / 2} style={{ marginTop: -windowHeight / 7, marginRight: -windowWidth / 5 }} />
      </ScreenHeaderLayout>
      <GradientBackground blur={true} style={{ flex: 1, position: 'relative' }}>
        <View style={styles.input_row}>
          <Input label="Name" inputConfig={{ autoCorrect: false, onChangeText: inputHandler.bind(this, 'username') }} value={userInfo.username} />
          <SelectInput label="Gender" identifier="gender" data={gender} defaultValue={userInfo.gender} setUserInfo={setUserInfo} />
        </View>
        <View style={styles.input_row}>
          <SelectInput label="Where are you from?" identifier="country" data={countries} defaultValue={userInfo.country} setUserInfo={setUserInfo} />
          <DatePickerInput label="Date of birth" value={value} onPress={onPress} />
        </View>
      </GradientBackground>
    </View>
  );
}

export default FirstSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  input_row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
    marginHorizontal: 10
  },
});
