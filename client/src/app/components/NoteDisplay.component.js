import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import MomentDisplay from './MomentDisplay.component';
import { store } from '../../core/redux/store';
import { appStyles, appSpacing, appColors } from '../../assets/styles/appStyles.styles';
import { HttpService } from '../../core/services/HttpService';
import { AlertsService } from '../../core/services/AlertsService';

const httpService = Object.create(HttpService);
const alertsService = Object.create(AlertsService);

class NoteDisplay extends React.Component {
  constructor() {
    super();
    this.globalModalTrigger = store.getState().events.globalModalTrigger;
    this.triggerModal = this.triggerModal.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
    this.triggerEdit = this.triggerEdit.bind(this);
  }

  triggerModal(template, content, actions) {
    this.globalModalTrigger.emit('trigger-modal', { template, content, actions });
  }

  triggerEdit() {
    const { note } = this.props;
    this.globalModalTrigger.emit('trigger-nav', {
      path: 'Notepad',
      params: {
        content: { note },
        noteType: 'note',
        icon: 'note',
        bookId: note.bookId
      }
    });
  }

  triggerDelete(template, content, actions) {
    this.triggerModal(template, content, actions);
  }

  cancelDelete() {
    const { note } = this.props;
    this.triggerModal('note', { note }, {
      triggerEdit: this.triggerEdit.bind(this),
      triggerDelete: this.triggerDelete.bind(this, 'confirmDelete', { id: note.id, text: 'This action cannot be undone' }, {
        delete: this.deleteNote.bind(this),
        cancel: this.cancelDelete.bind(this)
      })
    });
  }

  deleteNote() {
    const { note } = this.props;
    httpService.delete(`notes/${note.id}`, null).then((result) => {
      if (result.success) {
        note.removeFromStore(store);
        alertsService.createAlert('Note Deleted', 'check');
        this.globalModalTrigger.emit('close-modal');
      }
    }).catch((error) => {
      console.error('ERROR DELETING NOTE', error);
    });
  }

  render() {
    const { note } = this.props;
    return (note) ? (
      <TouchableOpacity
        onPress={() => {
          this.triggerModal('note', { note }, {
            triggerEdit: this.triggerEdit.bind(this),
            triggerDelete: this.triggerDelete.bind(this, 'confirmDelete', { id: note.id }, {
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
    ) : null;
  }
}

export default NoteDisplay;