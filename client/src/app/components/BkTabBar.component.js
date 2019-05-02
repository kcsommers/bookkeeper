import React from 'react';
import {
  View, StyleSheet, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { normalizeFont, appColors, appHeights } from '../../assets/styles/appStyles.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.offWhite,
    height: appHeights.ten,
    justifyContent: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconBtn: {
    transform: [{
      translateY: -10
    }]
  }
});

export default class BkTabBar extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={[styles.wrapper]}>
          <TouchableOpacity style={[styles.iconBtn]} onPress={() => { navigation.navigate('Profile'); }}>
            <Icon
              name="account"
              size={normalizeFont(30)}
              color={appColors.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn]} onPress={() => { navigation.navigate('Search'); }}>
            <Icon
              name="telescope"
              size={normalizeFont(30)}
              color={appColors.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn]} onPress={() => { navigation.navigate('Search'); }}>
            <Icon
              name="book-open-page-variant"
              size={normalizeFont(30)}
              color={appColors.gray}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}