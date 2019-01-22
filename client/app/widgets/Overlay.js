import React from 'react';
import {
  Animated, TouchableWithoutFeedback
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/styles/appStyles';

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.overlayAnim = new Animated.Value(0);
    this._fadeOut = this._fadeOut.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.overlayAnim, {
      duration: 500,
      toValue: 1
    }).start();
  }

  _fadeOut() {
    Animated.timing(this.overlayAnim, {
      duration: 500,
      toValue: 0
    }).start(() => {
      this.props.handleFadeFinish();
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._fadeOut}>
        <Animated.View style={[{
          position: 'absolute',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: '#222',
          zIndex: 900,
          opacity: this.overlayAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.9]
          })
        }]}
        />
      </TouchableWithoutFeedback>
    );
  }
}

export default Overlay;