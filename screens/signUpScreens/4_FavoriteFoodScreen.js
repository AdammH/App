import { StyleSheet, View, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import GradientBackground from '../../components/UI/GradientBackground';
import ScreenHeaderLayout from '../../components/Layouts/ScreenHeader';
import Colors from '../../constants/colors';
import { FlashList } from '@shopify/flash-list';
import { flashListItemFunction } from '../../functions/flashListItemFunction';
import FoodImage from '../../assets/food_image.svg';

function FourthSignUpScreen({ setUserInfo }) {
  const windowHeight = Dimensions.get('window').height;
  const data = ['Pizza', 'Chocolate', 'Steak', 'Burger', 'Donuts', 'Ice cream'];

  return (
    <View style={styles.container}>
      <ScreenHeaderLayout mainHeader={'Favorite food'}>
        <SvgXml xml={FoodImage} height={windowHeight / 3} style={{ marginTop: 19 }} />
      </ScreenHeaderLayout>
      <GradientBackground blur={false} style={styles.gradient_style}>
        <View style={{ height: 220, minHeight: 2 }}>
          <FlashList data={data} renderItem={(item, index) => flashListItemFunction(item, index)} estimatedItemSize={30} numColumns={2} />
        </View>
      </GradientBackground>
    </View>
  );
}

export default FourthSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  gradient_style: {
    flex: 1,
    position: 'relative',
    marginBottom: -20,
  },
});
