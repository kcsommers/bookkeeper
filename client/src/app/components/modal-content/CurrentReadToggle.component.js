import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { appStyles, appSpacing } from '../../../assets/styles/appStyles.styles';
import { styles } from '../../../assets/styles/modalStyles.styles';
import { GlobalService } from '../../../core/services/GlobalService';
import { HttpService } from '../../../core/services/HttpService';
import { AlertsService } from '../../../core/services/AlertsService';

const globalService = Object.create(GlobalService);
const httpService = Object.create(HttpService);
const alertsService = Object.create(AlertsService);

export default class CurrentReadToggle extends React.Component {
  constructor(props) {
    super(props);
    this._addBook = this._addBook.bind(this);
    this._finishBook = this._finishBook.bind(this);
  }

  _addBook() {
    const { book, userId } = this.props.content;
    const store = globalService.getStore();
    const { lists } = store.getState();
    httpService.update(`books/update/${book.id}`, { current: true }).then(() => {
      if (lists.hasOwnProperty(0)) {
        book.markAsCurrent(store);
      } else {
        globalService.createCurrentReadsList([book.id], userId);
      }
      alertsService.createAlert('Added to Current Reads', 'bookmark-plus');
      this.props.actions.onConfirm();
    }).catch(error => {
      console.log('ERROR UPDATING BOOK', error);
    });
  }

  _finishBook() {
    const { book } = this.props.content;
    const store = globalService.getStore();
    httpService.update(`books/update/${book.id}`, { current: false }).then(() => {
      book.markAsFinished(store);
      alertsService.createAlert('Finished!', 'creation');
      this.props.actions.onConfirm();
    }).catch(error => {
      console.log('ERROR UPDATING BOOK', error);
    });
  }

  render() {
    const { book } = this.props.content;
    const text = book.current ? 'Finished this book? ' : 'Add this book to your current reads?';
    return (
      <View style={[styles.contentWrapper, appStyles.paddingMd]}>
        <Text style={[appStyles.h5, { marginBottom: appSpacing.md.y }]}>{text}</Text>
        <TouchableOpacity
          style={[appStyles.buttonAqua]}
          onPress={(book.current) ? this._finishBook : this._addBook}
        >
          <Text style={[appStyles.buttonText]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}