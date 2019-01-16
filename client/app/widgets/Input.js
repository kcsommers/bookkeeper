import React from 'react';
import {
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import { appStyles, SCREEN_HEIGHT, normalizeFont } from '../../assets/styles/appStyles';

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#fefefe',
    borderBottomWidth: 2,
    padding: 5,
    alignSelf: 'stretch'
  },
  input: {
    fontSize: normalizeFont(15),
    color: '#fefefe'
  }
});

const Input = (props) => {
  return (
    <View style={[styles.container, appStyles.boxShadow, {
      marginTop: SCREEN_HEIGHT * 0.005,
      marginBottom: SCREEN_HEIGHT * 0.015,
    }]}
    >
      <TextInput
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor="#efefef"
        secureTextEntry={props.isPassword}
        textContentType={props.textContentType}
        returnKeyLabel="Submit"
        clearButtonMode="while-editing"
        blurOnSubmit={true}
        enablesReturnKeyAutomatically={true}
        selectTextOnFocus={true}
        onChangeText={(value) => { props.handleChange(value, props.field); }}
        onFocus={() => { }}
        onBlur={() => { }}
        onSubmitEditing={() => { }}
        style={[styles.input]}
      />
    </View>
  );
};

export default Input;