import React from 'react';
import {
  ScrollView,
  Text,
  Animated
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT, AppStyling } from '../../assets/styles/appStyles';

const appStyles = new AppStyling().getAppStyles();

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItemIndex: 0,
      currentOffset: 0
    };
    this.carouselAnim = new Animated.Value(0);
    this._handleScrollEnd = this._handleScrollEnd.bind(this);
  }

  componentDidMount() {
    const { items } = this.props;
    this.setState({ items });
    if (items && items.length) {
      this.props.updateCurrent(items[0]);
    }
  }

  _handleScrollEnd(e) {
    const { items } = this.props;
    const { currentItemIndex, currentOffset } = this.state;
    const newOffset = e.nativeEvent.targetContentOffset.x;
    let newIndex = currentItemIndex;
    if (newOffset > currentOffset) {
      newIndex += 1;
    } else if (newOffset < currentOffset) {
      newIndex -= 1;
    }

    if (newIndex !== currentItemIndex) {
      this.props.updateCurrent(items[newIndex]);
      this.setState({
        currentItemIndex: newIndex,
        currentOffset: newOffset
      });
    }
  }

  animateBookThumb(shouldGrow) {
    if (shouldGrow) {
      Animated.timing(this.carouselAnim, {
        duration: 500,
        toValue: 1
      }).start();
    } else {
      Animated.timing(this.carouselAnim, {
        duration: 500,
        toValue: 0
      }).start();
    }
  }

  render() {
    const { items } = this.state;
    const itemsMapped = (items) ? items.map((item) => (
      <Animated.View
        key={item.id}
        style={[{
          alignSelf: 'stretch',
          alignItems: 'center',
          width: SCREEN_WIDTH,
          paddingTop: this.carouselAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [appStyles.paddingLg.y, 0]
          }),
          paddingBottom: this.carouselAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [appStyles.paddingLg.y, 0]
          })
        }]}
      >
        <Animated.Image
          key={item.id}
          style={[appStyles.boxShadow,
            {
              borderWidth: 2,
              borderColor: '#fff',
              borderRadius: 5,
              width: this.carouselAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [(SCREEN_HEIGHT * 0.45) * 0.649, SCREEN_WIDTH]
              }),
              height: SCREEN_HEIGHT * 0.45
            }]}
          source={{ uri: item.thumbnail, cache: 'force-cache' }}
          resizeMode="cover"
        />
      </Animated.View>
    )) : <Text>No Items</Text>;

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={this._handleScrollEnd}
      >
        {itemsMapped}
      </ScrollView>
    );
  }
}

export default Carousel;