import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import MomentDisplay from './MomentDisplay.component';
import { store } from '../../core/redux/store';
import { appStyles, appSpacing, appColors } from '../../assets/styles/appStyles.styles';
import { HttpService } from '../../core/services/HttpService';

const httpService = Object.create(HttpService);

class NoteDisplay extends React.Component {
  constructor() {
    super();
    this.modalTrigger = store.getState().events.modalTrigger;
    this.triggerModal = this.triggerModal.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
    this.triggerEdit = this.triggerEdit.bind(this);
  }

  componentWillMount() {
  }

  triggerModal(template, content, actions) {
    this.modalTrigger.emit('trigger-modal', { template, content, actions });
  }

  triggerDelete(template, content, actions) {
    this.triggerModal(template, content, actions);
  }

  cancelDelete() {
    this.triggerModal('note', { note: this.props.note }, {
      triggerEdit: this.triggerEdit.bind(this),
      triggerDelete: this.triggerDelete.bind(this, 'confirmDelete', { id: this.props.note.id }, {
        delete: this.deleteNote.bind(this),
        cancel: this.cancelDelete.bind(this)
      })
    });
  }

  triggerEdit() {
    const { note } = this.props;
    this.modalTrigger.emit('trigger-nav', {
      path: 'Notepad',
      params: {
        content: { note },
        noteType: 'note',
        icon: 'note',
        bookId: note.bookId
      }
    });
  }

  deleteNote() {
    httpService.delete(`notes/${this.props.note.id}`, null).then((result) => {
      if (result.success) {
        this.modalTrigger.emit('close-modal');
      }
    }).catch((error) => {
      console.error('ERROR DELETING NOTE', error);
    });
  }

  render() {
    const { note } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.triggerModal('note', { note }, {
            triggerEdit: this.triggerEdit.bind(this),
            triggerDelete: this.triggerDelete.bind(this, 'confirmDelete', { id: this.props.note.id }, {
              delete: this.deleteNote.bind(this),
              cancel: this.cancelDelete.bind(this)
            })
          });
        }}
        style={[appStyles.boxShadow, appStyles.paddingMd, {
          marginBottom: appSpacing.lg.y,
          backgroundColor: appColors.white
        }]}
      >
        <MomentDisplay time={note.createdAt} />
        <Text style={[appStyles.noteText]}>{note.content}</Text>
      </TouchableOpacity>
    );
  }
}

export default NoteDisplay;