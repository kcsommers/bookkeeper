import React from 'react';
import Moment from 'react-moment';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated
} from 'react-native';
import {
  appStyles, normalizeFont, SCREEN_HEIGHT
} from '../../assets/styles/appStyles';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: '#fff',
    paddingLeft: appStyles.paddingMd.x,
    paddingRight: appStyles.paddingMd.x,
    paddingTop: appStyles.paddingMd.y,
    paddingBottom: appStyles.paddingMd.y,
    alignSelf: 'stretch',
    borderRadius: 3
  },
  text: {
    fontSize: normalizeFont(14),
    fontFamily: 'Merriweather'
  }
});

class TextCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardStyle: {
        position: 'static',
        width: '100%'
      }
    };
    this.cardAnim = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.cardAnim, {
      duration: 700,
      toValue: 1
    }).start();
  }

  fadeOut() {
    Animated.timing(this.cardAnim, {
      duration: 700,
      toValue: 0
    }).start();
  }

  render() {
    const { cardStyle } = this.state;
    const { createdAt, content } = this.props.item;
    return (
      <Animated.View
        ref={(e) => { this.container = e; }}
        style={[
          styles.container,
          appStyles.boxShadow,
          cardStyle,
          {
            opacity: this.cardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }
        ]}
      >
        <TouchableOpacity onPress={() => { this.props.onPress(this.props.item); }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#444',
              marginBottom: SCREEN_HEIGHT * 0.02,
              paddingBottom: SCREEN_HEIGHT * 0.007
            }}
          >
            <Text style={{ fontSize: normalizeFont(12) }}>
              added
              {' '}
              <Moment
                element={Text}
                fromNowDuring={2.628e+9}
                style={{ fontSize: normalizeFont(12) }}
              >
                {createdAt}
              </Moment>
            </Text>
          </View>
          <Text style={styles.text}>
            {content}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default TextCard;