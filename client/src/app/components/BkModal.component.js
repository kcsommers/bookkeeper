import React from 'react';
import {
  View
} from 'react-native';
import Modal from 'react-native-modal';

export default class BkModal extends React.Component {
  render() {
    const { isVisible, closeModal } = this.props;
    return (
      <View>
        <Modal isVisible={isVisible} onBackdropPress={closeModal}>
          {this.props.children}
        </Modal>
      </View>

    );
  }
}