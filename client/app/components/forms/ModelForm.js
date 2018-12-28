import axios from 'axios';
import React from 'react';
import { Button, View } from 'react-native';
import Input from '../../widgets/Input';
import FormTypes from './formData';

class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: FormTypes[this.props.model].inputs
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange($value, field) {
    this.setState((prevState) => ({
      inputs: {
        ...prevState.inputs,
        [field]: { ...prevState.inputs[field], value: $value }
      }
    }));
  }

  async _handleSubmit() {
    const { url } = FormTypes[this.props.model];
    const { modelData } = this.props;
    const inputData = {};

    Object.entries(this.state.inputs).forEach((inputArr) => {
      inputData[inputArr[0]] = inputArr[1].value;
    });

    const data = Object.assign({}, inputData, modelData);
    const returnedData = await axios.post(url, data);
    return returnedData.data;
  }

  render() {
    const { inputs } = FormTypes[this.props.model];
    const inputsMapped = Object.values(inputs).map((input) => {
      let textContentType = 'none';
      switch (input.field) {
        case 'username':
        case 'password':
        case 'location':
          textContentType = input.field;
          break;
        case 'email':
          textContentType = 'emailAddress';
          break;
        default:
          textContentType = 'none';
      }
      return (
        <Input
          key={input.field}
          field={input.field}
          placeholder={input.placeholder}
          handleChange={($value, field) => { this._handleChange($value, field); }}
          isPassword={input.field === 'password'}
          isEmail={input.field === 'email'}
          keyboardType={input.field !== 'email' ? 'default' : 'email-address'}
          textContentType={textContentType}
        />
      );
    });

    return (
      <View>
        {inputsMapped}
        <Button
          title={this.props.submitTitle}
          onPress={() => {
            this._handleSubmit().then((data) => {
              this.props.onSubmit(data);
            }).catch((error) => {
              console.error('In submit button, error handling submit', error);
            });
          }}
        />
      </View>
    );
  }
}

export default BasicForm;