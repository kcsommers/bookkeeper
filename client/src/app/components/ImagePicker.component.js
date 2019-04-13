import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

export default class ImagePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
    this._pickImage = this._pickImage.bind(this);
  }

  async _pickImage() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result });
      this.props.onUpload(this.state.image);
    }
  }

  render() {
    const { children, buttonStyles } = this.props;
    return (
      <TouchableOpacity
        onPress={this._pickImage}
        style={buttonStyles}
      >
        {children}
      </TouchableOpacity>
    );
  }
}