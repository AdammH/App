import { StyleSheet, View, Image, Text, Dimensions, Pressable, ScrollView } from 'react-native';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import { SvgXml } from 'react-native-svg';
import GradientBackground from '../../components/UI/GradientBackground';
import SmallRoundedButton from '../../components/UI/buttons/SmallRoundedButton';
import BlueAttendeeIcon from '../../assets/blue-attendee.svg';
import GreenAttendeeIcon from '../../assets/green-attendee.svg';
import RedAttendeeIcon from '../../assets/red-attendee.svg';
import { Ionicons } from '@expo/vector-icons';

function DescriptionScreen({ navigation }) {
  const windowHeight = Dimensions.get('window').height;
  const attendeeIcons = [BlueAttendeeIcon, GreenAttendeeIcon, RedAttendeeIcon];
  let image;
  loop = 0;
  function goBackHandler() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <SmallRoundedButton onPress={goBackHandler} lightStyle={true}>
          <Ionicons name="chevron-back-outline" size={20} color={Colors.text_color} />
        </SmallRoundedButton>
        <SmallRoundedButton onPress={goBackHandler} lightStyle={true}>
          <Ionicons name="ellipsis-horizontal-outline" size={20} color={Colors.text_color} />
        </SmallRoundedButton>
      </View>
      <View style={[styles.image_container, { height: windowHeight * 0.35 }]}>
        <Image source={require('../../assets/description_party_bg_image.png')} style={{ height: windowHeight * 0.7, width: '100%', position: 'absolute', top: 0 }} />
      </View>
      <GradientBackground blur={true} style={[styles.gradient_style]} topIconBoxVisible={true}>
        <View style={styles.party_description_wrapper}>
          <View style={styles.row_elements_space_between}>
            <Text style={styles.party_header}>Huge Party</Text>
            <Ionicons name="arrow-redo-outline" size={25} color={Colors.icon_light_gray_color} />
          </View>
          <View style={styles.row_elements}>
            <Ionicons name="calendar-outline" size={20} color={Colors.text_gray_color} />
            <Text style={styles.party_header_two}>Thu, 14.12.2023</Text>
            <Ionicons name="time-outline" size={20} color={Colors.text_gray_color} />
            <Text style={styles.party_header_two}>22:00</Text>
          </View>
          <View style={styles.row_elements}>
            <View style={{ alignItems: 'center', rowGap: 12 }}>
              <LinearGradient colors={[Colors.light_item_type_grad_green, Colors.dark_item_type_grad_green]} start={[0, 0]} style={styles.type_icon}>
                <Image source={require('../../assets/type/fun.png')} style={styles.inner_icon_style} />
              </LinearGradient>
              <Text style={styles.party_header_two}>Party</Text>
            </View>
            <View style={{ alignItems: 'center', rowGap: 12 }}>
              <LinearGradient colors={[Colors.light_item_type_grad_green, Colors.dark_item_type_grad_green]} start={[0, 0]} style={styles.type_icon}>
                <Image source={require('../../assets/type/music.png')} style={styles.inner_icon_style} />
              </LinearGradient>
              <Text style={styles.party_header_two}>Rap</Text>
            </View>
            <View style={{ alignItems: 'center', rowGap: 12 }}>
              <LinearGradient colors={[Colors.light_item_type_grad_green, Colors.dark_item_type_grad_green]} start={[0, 0]} style={styles.type_icon}>
                <Image source={require('../../assets/type/building.png')} style={styles.inner_icon_style} />
              </LinearGradient>
              <Text style={styles.party_header_two}>Berlin</Text>
            </View>
            <View style={{ alignItems: 'center', rowGap: 12 }}>
              <LinearGradient colors={[Colors.light_item_type_grad_green, Colors.dark_item_type_grad_green]} start={[0, 0]} style={styles.type_people_icon}>
                {attendeeIcons.map((icon) => {
                  loop++;

                  if (loop <= 4) {
                    return <SvgXml xml={icon} width={30} height={30} key={Math.random()} />;
                  }
                })}
                <View
                  style={[
                    styles.party_number,
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: Colors.stroke_number_container,
                      backgroundColor: Colors.bg_number_container,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                >
                  <Text style={{ color: Colors.text_gray_color }}>{4}</Text>
                </View>
              </LinearGradient>
              <Text style={styles.party_header_two}>People</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.textarea}>
            <Text style={styles.textarea_text}>
              Hello, I create this party for meeting new people. Everything will be at great place, so you can fully enjoy listening to songs and find new friends!
            </Text>
            <Pressable style={styles.read_more_text}>
              <Text style={[styles.textarea_text, { textDecorationLine: 'underline' }]}>Read More</Text>
            </Pressable>
          </View>
          <View style={[styles.row_elements_space_between, { marginVertical: 16 }]}>
            <View>
              <Text style={styles.party_header_two}>Price</Text>
              <Text style={styles.price_amount_text}>5.00€</Text>
            </View>
            <PrimaryButton onPress={goBackHandler} text="Join" />
          </View>
          <View style={styles.bottom} />
        </View>
      </GradientBackground>
    </ScrollView>
  );
}

export default DescriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
    position: 'relative',
  },
  image_container: {
    flex: 1,
    alignItems: 'center',
  },
  type_icon: {
    width: 77,
    height: 77,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  type_people_icon: {
    width: 77,
    height: 77,
    borderRadius: 24,
    flexWrap: 'wrap',
    rowGap: 4,
    columnGap: 4,
    alignContent: 'center',
    justifyContent: 'center',
  },

  inner_icon_style: {
    width: 33,
    height: 33,
  },
  inner_people_icon_style: {
    width: 30,
    height: 30,
  },
  info_container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
    borderRadius: 24,
    rowGap: 16,
    backgroundColor: Colors.background_color,
  },
  info_container_back: {
    flex: 1,
    paddingTop: 50,
    borderRadius: 24,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    top: -2,
  },

  row_elements_space_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  media_icon: {
    marginRight: 12,
  },
  link_text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'poppins-medium',
  },
  row_elements: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },

  gradient_style: {
    flex: 1.5,
    position: 'relative',
    marginBottom: -20,
  },
  party_description_wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    rowGap: 32,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
    zIndex: 1,
  },
  party_header: {
    color: Colors.text_color,
    fontSize: 24,
    fontFamily: 'poppins-semi-bold',
  },
  party_header_two: {
    color: Colors.text_gray_color,
    fontSize: 14,
    fontFamily: 'poppins-regular',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.stroke_number_container,
  },
  textarea: {
    maxWidth: 340,
  },
  textarea_text: {
    fontFamily: 'poppins-regular',
    fontSize: 13,
    color: Colors.light_green,
  },
  price_amount_text: {
    fontFamily: 'poppins-semi-bold',
    fontSize: 22,
    color: Colors.light_green,
  },
  bottom: {
    height: 20,
  },
});
