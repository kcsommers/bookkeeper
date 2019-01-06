import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { AppStyling, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/styles/appStyles';

const AppStyles = new AppStyling();
const globalStyles = AppStyles.getAppStyles();
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: '#fff',
    paddingLeft: SCREEN_WIDTH * 0.03,
    paddingRight: SCREEN_WIDTH * 0.03,
    paddingTop: SCREEN_HEIGHT * 0.02,
    paddingBottom: SCREEN_HEIGHT * 0.02,
    alignSelf: 'stretch',
    borderRadius: 3
  },
  text: {
    fontSize: AppStyles.normalizeFont(12),
    fontFamily: 'Merriweather'
  }
});

class TextCard extends React.Component {
  render() {
    return (
      <View style={[styles.container, globalStyles.boxShadow]}>
        <Text style={styles.text}>
          Erat sit ipsum sit ipsum eos, no amet eos justo lorem,
          sanctus sadipscing ipsum...Et ipsum invidunt diam est amet, magna diam amet magna nonumy stet justo accusam amet, accusam eos ea diam sadipscing.
        </Text>
      </View>
    );
  }
}

export default TextCard;