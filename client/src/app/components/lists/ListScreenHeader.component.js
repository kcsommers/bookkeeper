import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { appColors, appStyles, normalizeFont } from '../../../assets/styles/appStyles.styles';
import { headerStyles } from '../../../assets/styles/lists/listStyles.styles';
import BkDivider from '../BkDivider.component';

export default class ListScreenHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentDisplay: 'full' };
    this.fullDisplayAnim = new Animated.Value(1);
    this.gridDisplayAnim = new Animated.Value(0);
    this.titlesDisplayAnim = new Animated.Value(0);
    this._changeDisplay = this._changeDisplay.bind(this);
  }

  _changeDisplay(display) {
    // :::: TODO :::: (set in local storage)
    if (display !== this.state.currentDisplay) {
      if (display === 'titles') {
        Animated.parallel([
          Animated.timing(this.titlesDisplayAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(this.fullDisplayAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(this.gridDisplayAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        ]).start();
      } else if (display === 'full') {
        Animated.parallel([
          Animated.timing(this.titlesDisplayAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(this.fullDisplayAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(this.gridDisplayAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        ]).start();
      } else if (display === 'grid') {
        Animated.parallel([
          Animated.timing(this.titlesDisplayAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(this.fullDisplayAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(this.gridDisplayAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          })
        ]).start();
      }
      this.setState({ currentDisplay: display });
    }
  }

  render() {
    return (
      <View style={[headerStyles.header, appStyles.paddingMd]}>
        <View style={[headerStyles.displayOptionsContainer, appStyles.boxShadow]}>
          <Animated.View style={[{
            position: 'relative',
            opacity: this.fullDisplayAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1]
            }),
            transform: [{
              scale: this.fullDisplayAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2]
              })
            }]
          }]}
          >
            <TouchableOpacity
              onPress={() => { this._changeDisplay('full'); this.props.changeDisplay('full'); }}
              style={[headerStyles.displayOptionBtn]}
            >
              <Icon
                name="book"
                size={normalizeFont(25)}
                color={appColors.gray}
              />
            </TouchableOpacity>

          </Animated.View>

          <Animated.View style={[{
            opacity: this.gridDisplayAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1]
            }),
            transform: [{
              scale: this.gridDisplayAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2]
              })
            }]
          }]}
          >
            <TouchableOpacity
              onPress={() => { this._changeDisplay('grid'); this.props.changeDisplay('grid'); }}
              style={[headerStyles.displayOptionBtn]}
            >
              <Icon
                name="view-grid"
                size={normalizeFont(26)}
                color={appColors.gray}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[headerStyles.displayOptionBtn, {
            opacity: this.titlesDisplayAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1]
            }),
            transform: [{
              scale: this.titlesDisplayAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2]
              })
            }]
          }]}
          >
            <TouchableOpacity
              onPress={() => {
                this._changeDisplay('titles');
                this.props.changeDisplay('titles');
              }}
              style={[headerStyles.displayOptionBtn]}
            >
              <Icon
                name="view-list"
                size={normalizeFont(30)}
                color={appColors.gray}
              />
            </TouchableOpacity>
          </Animated.View>

        </View>
        <View style={[headerStyles.addBookBtnContainer]}>
          <TouchableOpacity
            style={[headerStyles.addBookBtn]}
            onPress={this.props.showSearchBar}
          >
            <Icon
              name="plus"
              size={normalizeFont(32)}
              color={appColors.aqua}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}