/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import AddListComponent from '../../app/components/modal-content/AddList.component';
import ConfirmBox from '../../app/components/modal-content/ConfirmBox.component';
import CurrentReadToggle from '../../app/components/modal-content/CurrentReadToggle.component';
import NoteCard from '../../app/components/notes/NoteCard.component';

const templates = {
  note: (content) => (
    <NoteCard note={content.note} />
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