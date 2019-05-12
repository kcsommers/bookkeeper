import React from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { appStyles, appColors, normalizeFont, appSpacing } from '../../../assets/styles/appStyles.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { cardStyles } from '../../../assets/styles/notes/noteStyles.styles';
import { store } from '../../../core/redux/store';
import { AlertsService } from '../../../core/services/AlertsService';
import { HttpService } from '../../../core/services/HttpService';
import MomentDisplay from '../MomentDisplay.component';

const httpService = Object.create(HttpService);
const alertsService = Object.create(AlertsService);

class NoteCard extends React.Component {
  constructor() {
    super();
    this.globalModalTrigger = store.getState().events.globalModalTrigger;
    this.triggerModal = this.triggerModal.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
    this.triggerEdit = this.triggerEdit.bind(this);
  }

  triggerModal(template, content, actions) {
    this.globalModalTrigger.emit('trigger-modal', { template, content, actions, animations: { in: 'zoomIn', out: 'slideOutDown' } });
  }

  triggerEdit() {
    const { note } = this.props;
    this.globalModalTrigger.emit('trigger-nav', 'Notepad', {
      note,
      type: note.type,
      bookId: note.bookId
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

  _clickContent(note) {
    return (
      <TouchableOpacity
        style={[appStyles.boxShadow, appStyles.paddingMd, cardStyles.noteCardBtn]}
        onPress={() => { this.triggerModal('note', { note }, null); }}
      >
        <MomentDisplay time={note.createdAt} />
        <Text
          style={[cardStyles.noteText, { fontSize: normalizeFont(14) }]}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {note.content}

        </Text>
      </TouchableOpacity>
    );
  }

  _nonClickContent(note) {
    return (
      <View style={[appStyles.boxShadow, appStyles.paddingMd, cardStyles.noteCardContainer]}>
        <ScrollView contentContainerStyle={[cardStyles.cardScrollContainer]}>
          <Text style={[cardStyles.noteText, { fontSize: normalizeFont(16) }]}>{note.content}</Text>
        </ScrollView>
        <View style={[cardStyles.footer]}>
          <TouchableOpacity
            onPress={this.triggerEdit}
          >
            <Icon
              name="square-edit-outline"
              size={normalizeFont(30)}
              color={appColors.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ marginLeft: appSpacing.sm.x }]}
            onPress={() => {
              this.triggerDelete('confirmDelete', { id: this.props.note.id }, {
                delete: this.deleteNote.bind(this),
                cancel: this.cancelDelete.bind(this)
              });
            }}
          >
            <Icon
              name="trash-can-outline"
              size={normalizeFont(30)}
              color={appColors.red}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { note, clickEnabled } = this.props;
    return note && ((clickEnabled) ? this._clickContent(note) : this._nonClickContent(note));
  }
}

export default NoteCard;