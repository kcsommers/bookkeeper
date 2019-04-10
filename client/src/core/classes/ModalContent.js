/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import {
  Text, View, TouchableOpacity, TextInput
} from 'react-native';
import { appColors, appStyles } from '../../assets/styles/appStyles.styles';
import { styles, noteStyles } from '../../assets/styles/modalStyles.styles';

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
    <View>
      <Text>Are You Sure?</Text>
      <Text>{content.text}</Text>
      <TouchableOpacity onPress={() => { actions.delete(content.id); }}>
        <Text>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { actions.cancel(content.id); }}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  ),
  newListForm: (content, actions) => (
    <View style={[styles.contentWrapper, appStyles.paddingMd]}>
      <Text style={[appStyles.h5]}>Create New List</Text>
      <TextInput
        style={[styles.modalInput, appStyles.boxShadow]}
        placeholder="List Name"
        placeholderTextColor={appColors.gray}
        returnKeyLabel="Submit"
        clearButtonMode="while-editing"
        blurOnSubmit={true}
        enablesReturnKeyAutomatically={true}
        selectTextOnFocus={true}
        onChangeText={(value) => { actions.listInputChange(value); }}
      />
      <TouchableOpacity
        style={[styles.addBtn]}
        onPress={actions.createList}
      >
        <Text style={[appStyles.buttonText]}>Add List</Text>
      </TouchableOpacity>
    </View>
  )
};

export default class ModalContent {
  constructor(
    templateName,
    content,
    actions
  ) {
    this.templateName = templateName;
    this.content = content;
    this.actions = actions;
  }

  initModal() {
    this.template = templates[this.templateName](this.content, this.actions);
  }
}