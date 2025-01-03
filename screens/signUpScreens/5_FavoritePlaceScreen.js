import { StyleSheet, View, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../../constants/colors';
import { FlashList } from '@shopify/flash-list';
import GradientBackground from '../../components/UI/GradientBackground';
import ScreenHeaderLayout from '../../components/Layouts/ScreenHeader';
import { flashListItemFunction } from '../../functions/flashListItemFunction';
import PlaceImage from '../../assets/favorite_place_image.svg';

function FifthSignUpScreen({ setUserInfo }) {
  const windowHeight = Dimensions.get('window').height;
  const data = ['Park', 'Museum', 'Cinema', 'Concert', 'Library', 'Restaurant'];

  return (
    <View style={styles.container}>
      <ScreenHeaderLayout mainHeader={'Favorite Place'}>
        <SvgXml xml={PlaceImage} height={windowHeight / 3} style={{ marginTop: 19 }} />
      </ScreenHeaderLayout>
      <GradientBackground blur={false} style={styles.gradient_style}>
        <View style={{ height: 220, minHeight: 2 }}>
          <FlashList data={data} renderItem={(item, index) => flashListItemFunction(item, index)} estimatedItemSize={200} numColumns={2} />
        </View>
      </GradientBackground>
    </View>
  );
}

export default FifthSignUpScreen;

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
