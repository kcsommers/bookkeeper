import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import { AppStyling } from '../../assets/styles/appStyles';

const { height } = Dimensions.get('window');
const AppStyles = new AppStyling();
const globalStyles = AppStyles.getAppStyles();

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#fefefe',
    borderBottomWidth: 2,
    padding: 5,
    alignSelf: 'stretch'
  },
  input: {
    fontSize: AppStyles.normalizeFont(15),
    color: '#fefefe'
  }
});

const Input = (props) => {
  return (
    <View style={[styles.container, globalStyles.boxShadow, {
      marginTop: height * 0.005,
      marginBottom: height * 0.015,
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