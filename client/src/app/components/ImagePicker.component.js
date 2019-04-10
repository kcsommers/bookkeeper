import React from 'react';
import { View, Button, Image } from 'react-native';
import { ImagePicker } from 'expo';

export default class ImagePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  async _pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log('FUCKING PICK IMAGE RESULT', result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  render() {
    const { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image
          && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}