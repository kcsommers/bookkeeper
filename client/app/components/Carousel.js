import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import BookImage from '../widgets/BookImage';
import { SCREEN_WIDTH, SCREEN_HEIGHT, AppStyling } from '../../assets/styles/appStyles';

const appStyles = new AppStyling().getAppStyles();

const styles = StyleSheet.create({
  container: {
    paddingTop: SCREEN_HEIGHT * 0.02,
    paddingBottom: SCREEN_HEIGHT * 0.02
  }
});

class Carousel extends React.Component {
  render() {
    const { images } = this.props;
    const imagesMapped = images.map((img) => (
      <View key={img} style={[appStyles.boxShadow, { width: SCREEN_WIDTH }]}>
        <View style={[styles.container, {
          alignSelf: 'stretch',
          alignItems: 'center'
        }]}
        >
          <BookImage
            key={img}
            source={img}
            size="large"
          />
        </View>
      </View>
    ));

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {imagesMapped}
      </ScrollView>
    );
  }
}

export default Carousel;