import React from 'react';
import {
  TextInput
} from 'react-native';

const Input = (props) => {
  return (
    <TextInput
      onChangeText={(value) => { props.handleChange(value, props.field); }}
      onFocus={() => { }}
      onBlur={() => { }}
      blurOnSubmit={true}
      clearButtonMode="while-editing"
      enablesReturnKeyAutomatically={true}
      keyboardType="default"
      onSubmitEditing={() => { }}
      returnKeyLabel="Submit"
      selectTextOnFocus={true}
      placeholder={props.placeholder}
    />
  );
};

export default Input;