import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text
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
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItemIndex: 0,
      currentOffset: 0
    };
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

  render() {
    const { items } = this.state;
    const itemsMapped = (items) ? items.map((item) => (
      <View key={item.id} style={[appStyles.boxShadow, { width: SCREEN_WIDTH }]}>
        <View style={[styles.container, {
          alignSelf: 'stretch',
          alignItems: 'center'
        }]}
        >
          <BookImage
            key={item.id}
            source={item.thumbnail}
            size="large"
          />
        </View>
      </View>
    )) : <Text>No Items</Text>;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
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