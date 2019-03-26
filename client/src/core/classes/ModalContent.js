/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import {
  Text, View, TouchableOpacity
} from 'react-native';

const templates = {
  note: (content, actions) => (
    <View>
      <View>
        <Text>{content.note.content}</Text>
      </View>
      <TouchableOpacity onPress={actions.triggerEdit}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={actions.triggerDelete}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  ),
  confirmDelete: (content, actions) => (
    <View>
      <Text>Are You Sure?</Text>
      <Text>This action cannot be undone.</Text>
      <TouchableOpacity onPress={() => { actions.delete(content.id); }}>
        <Text>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { actions.cancel(content.id); }}>
        <Text>Cancel</Text>
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