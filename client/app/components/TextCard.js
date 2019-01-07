import React from 'react';
import Moment from 'react-moment';
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
    fontSize: AppStyles.normalizeFont(14),
    fontFamily: 'Merriweather'
  }
});

class TextCard extends React.Component {
  render() {
    return (
      <View style={[styles.container, globalStyles.boxShadow]}>
        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: '#444',
          marginBottom: SCREEN_HEIGHT * 0.02,
          paddingBottom: SCREEN_HEIGHT * 0.007
        }}
        >
          <Text style={{
            fontSize: AppStyles.normalizeFont(12)
          }}
          >
            added
            {' '}
            <Moment
              element={Text}
              fromNowDuring={2.628e+9}
              style={{
                fontSize: AppStyles.normalizeFont(12)
              }}
            >
              {this.props.item.createdAt}
            </Moment>
          </Text>
        </View>
        <Text style={styles.text}>
          {this.props.item.content}
        </Text>
      </View>
    );
  }
}

export default TextCard;