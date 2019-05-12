import React from 'react';
import Modal from 'react-native-modal';

export default class BkModal extends React.Component {
  render() {
    const { isVisible, closeModal, animations } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={closeModal}
        animationIn={animations.in}
        animationOut={animations.out}
      >
        {this.props.children}
      </Modal>
    );
  }
}