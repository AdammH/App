import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientBackground from '../../components/UI/GradientBackground';
import Colors from '../../constants/colors';
import QRCode from '../../components/UI/QRCode';
import { Ionicons } from '@expo/vector-icons';
import SmallRoundedButton from '../../components/UI/buttons/SmallRoundedButton';
import QRCodeInputBox from '../../components/UI/QRCodeInputBox';

function AddFriendScreen({ navigation }) {

  function goBackHandler() {
    navigation.goBack();
  }


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAwareScrollView behavior="position">
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', rowGap: 20, marginVertical: 20 }}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <SmallRoundedButton onPress={goBackHandler} lightStyle={false}>
                <Ionicons name="chevron-back-outline" size={20} color={Colors.text_color} />
              </SmallRoundedButton>
            </View>
            <Text style={styles.header_text}>Add Friends</Text>
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
        <GradientBackground blur={false} style={{ flex: 1, width: '100%' }}>
          <View style={styles.grad_container}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity>
                <Text style={styles.change_text}>Change</Text>
              </TouchableOpacity>
            </View>
            <QRCode />
            <View style={{ width: '80%', flexDirection: 'row', alignSelf: 'center', marginTop: 40, marginBottom: 12 }}>
              <Text style={styles.grey_code_text}>Special code</Text>
            </View>
            <View style={styles.code_text_box}>
              <Text style={styles.code_text}>dsawqeqwgc4587dsa547c1</Text>
            </View>
           <QRCodeInputBox />
          </View>
        </GradientBackground>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

export default AddFriendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.background_color,
  },

  activity_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background_color,
    alignItems: 'center',
  },
  bottom: {
    height: 78,
  },
  header_text: {
    color: Colors.text_color,
    fontSize: 22,
    fontFamily: 'poppins-medium',
    flex: 5,
    textAlign: 'center',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  grad_container: {
    flex: 1,
    marginHorizontal: 10,
  },
  change_text: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
    color: Colors.light_green,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 50,
  },

  linear_gradient_box: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
  linear_gradient_line: {
    position: 'absolute',
    width: '95.5%',
    height: '100%',
    borderTopWidth: 3.5,
    borderTopColor: Colors.qr_code_border_color,
    bottom: 2,
  },
  linear_gradient: {
    bottom: 0,
    width: '95.5%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
  grey_code_text: {
    color: Colors.gray_text_color,
    fontSize: 15,
    fontFamily: 'poppins-medium',
  },
  code_text_box: {
    width: '80%',
    height: 56,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.code_text_box_bg,
    borderWidth: 1.5,
    borderColor: Colors.light_green,
    borderRadius: 18,
    marginBottom: 38,
  },
  code_text: {
    color: Colors.light_green,
    fontSize: 16,
    fontFamily: 'poppins-medium',
  },


});
