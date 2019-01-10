import React from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

import { AppStyling } from '../../assets/styles/appStyles';

const appStyles = new AppStyling().getAppStyles();
const styles = StyleSheet.create({
  container: {

  },
  input: {
    backgroundColor: '#fff'
  }
});

class BookImage extends React.Component {
  render() {
    return (
      <View style={[styles.container, appStyles.boxShadow]}>
        <TextInput
          placeholder={this.props.placeholder}
          placeholderTextColor="#444"
          returnKeyLabel={this.props.returnKey}
          clearButtonMode="while-editing"
          blurOnSubmit={true}
          enablesReturnKeyAutomatically={true}
          selectTextOnFocus={true}
          onChangeText={this.handleChange}
          onFocus={() => { }}
          onBlur={() => { }}
          onSubmitEditing={() => { }}
          style={[styles.input]}
          ref={(e) => { this.input = e; }}
        />
      </View>
    );
  }
}

export default BookImage;