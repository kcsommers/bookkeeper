import axios from 'axios';
import React from 'react';
import { Button, View } from 'react-native';
import Input from '../../widgets/Input';
import FormTypes from './formData';

class AddForm extends React.Component {
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
    const newList = await axios.post(url, data);
    console.log('NEW LIST', newList.data);
  }

  render() {
    const { inputs } = FormTypes[this.props.model];
    const inputsMapped = Object.values(inputs).map((input) => (
      <Input
        key={input.field}
        field={input.field}
        placeholder={input.placeholder}
        handleChange={($value, field) => { this._handleChange($value, field); }}
      />
    ));
    return (
      <View>
        {inputsMapped}
        <Button
          title={this.props.submitTitle}
          onPress={this._handleSubmit}
        />
      </View>
    );
  }
}

export default AddForm;