import React from 'react';
import {
  View, Text
} from 'react-native';
import Modal from 'react-native-modal';

export default class BkModal extends React.Component {
  render() {
    const { isVisible, closeModal } = this.props;
    return (
      <View>
        <Text>WHAT THE HELL MODAL</Text>
        {this.props.children}
        <Modal isVisible={isVisible} onBackdropPress={closeModal}>
          {this.props.children}
        </Modal>
      </View>
    );
  }
}