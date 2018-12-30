import React from 'react';
import {
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import AppStyles from '../../assets/styles/appStyles';

const appStyles = StyleSheet.create(AppStyles);

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#fefefe',
    borderBottomWidth: 2,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch'
  },
  input: {
    fontSize: 20,
    color: '#fefefe'
  }
});

const Input = (props) => {
  return (
    <View style={[styles.container, appStyles.boxShadow]}>
      <TextInput
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor="#fefefe"
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
        style={styles.input}
      />
    </View>
  );
};

export default Input;