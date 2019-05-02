import React from 'react';
import {
  Animated
} from 'react-native';
import { appZindex } from '../../../assets/styles/appStyles.styles';

export default class SlideInFromTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewHeight: 0
    };
    this.slideAnim = new Animated.Value(0);
    this._setViewHeight = this._setViewHeight.bind(this);
    this._toggleSlide = this._toggleSlide.bind(this);
  }

  componentDidMount() {
    // const value = (this.props.isVisible) ? 1 : 0;
    // this.slideAnim = new Animated.Value(value);
  }

  componentDidUpdate() {
    this._toggleSlide(this.props.isVisible);
  }

  _setViewHeight(event) {
    const { height } = event.nativeEvent.layout;
    this.setState({ viewHeight: height });
  }

  _toggleSlide(isVisible) {
    const toValue = (isVisible) ? 1 : 0;
    const duration = (isVisible) ? 300 : 150;
    Animated.timing(this.slideAnim, {
      toValue,
      duration
    }).start();
  }

  render() {
    const { viewHeight } = this.state;
    return (
      <Animated.View
        style={[{
          backgroundColor: 'blue',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: appZindex.z8,
          transform: [{
            translateY: (viewHeight) ? this.slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-viewHeight, 0]
            }) : -1000
          }]
        }]}
        onLayout={this._setViewHeight}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
