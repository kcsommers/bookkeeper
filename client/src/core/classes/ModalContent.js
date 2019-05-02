/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AddListComponent from '../../app/components/modal-content/AddList.component';
import ConfirmBox from '../../app/components/modal-content/ConfirmBox.component';
import { appStyles } from '../../assets/styles/appStyles.styles';
import { noteStyles } from '../../assets/styles/modalStyles.styles';
import CurrentReadToggle from '../../app/components/modal-content/CurrentReadToggle.component';

const templates = {
  note: (content, actions) => (
    <View>
      <Text style={[noteStyles.noteText]}>{content.note.content}</Text>
      <TouchableOpacity
        style={[appStyles.buttonAqua]}
        onPress={actions.triggerEdit}
      >
        <Text style={[appStyles.buttonText]}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[appStyles.buttonRed]}
        onPress={actions.triggerDelete}
      >
        <Text style={[appStyles.buttonText]}>Delete</Text>
      </TouchableOpacity>
    </View>
  ),
  confirmDelete: (content, actions) => (
    <ConfirmBox
      content={content}
      actions={actions}
    />
  ),
  newListForm: (content, actions) => (
    <AddListComponent
      content={content}
      actions={actions}
    />
  ),
  currentReadToggle: (content, actions) => (
    <CurrentReadToggle
      content={content}
      actions={actions}
    />
  )
};

export default class ModalContent {
  constructor(
    templateName,
    content,
    actions,
  ) {
    this.templateName = templateName;
    this.content = content;
    this.actions = actions;
  }

  initModal() {
    this.template = templates[this.templateName](this.content, this.actions);
  }
}