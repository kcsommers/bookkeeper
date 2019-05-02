import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { styles } from '../../../assets/styles/components/bookDisplay.styles';
import { store } from '../../../core/redux/store';
import { HttpService } from '../../../core/services/HttpService';
import { AlertsService } from '../../../core/services/AlertsService';
import { appStyles, normalizeFont, appColors } from '../../../assets/styles/appStyles.styles';

const httpService = Object.create(HttpService);
const alertsService = Object.create(AlertsService);

export default class BookPreview extends React.Component {
  constructor(props) {
    super(props);
    this.dropdownOptions = [
      { value: 'Remove from list' },
      { value: 'Move to new list' },
      { value: 'Edit description' },
      { value: 'Change banner image' }
    ];
    this._onDropdownSelect = this._onDropdownSelect.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  deleteBook() {
    const { book, listId, modalTrigger } = this.props;
    httpService.delete(`books/${book.id}`).then(result => {
      if (result.success) {
        book.removeFromStore(store, listId);
        alertsService.createAlert('Book Deleted', 'check');
        modalTrigger.emit('close-modal');
      }
    }).catch(error => {
      console.error('ERROR DELETING BOOK', error);
    });
  }

  cancelDelete() {
    console.log('CANCELING DELETE');
  }

  _onDropdownSelect(selection) {
    const { modalTrigger, book } = this.props;
    switch (selection) {
      case 'Remove from list': {
        modalTrigger.emit('trigger-modal', {
          template: 'confirmDelete',
          content: {
            id: book.id,
            text: 'Removing this book will also remove all of its notes. If you\'d like to save your notes, be sure to move this book to another list.'
          },
          actions: {
            delete: this.deleteBook.bind(this),
            cancel: this.cancelDelete.bind(this)
          }
        });
        break;
      }
      case 'Move to new list': {
        break;
      }
      case 'Edit description': {
        break;
      }
      case 'Change banner image': {
        break;
      }
      default: {
        console.error(selection, 'is not a valid selection');
      }
    }
  }

  render() {
    const { book, navigate } = this.props;
    return (
      <View>
        <View style={[styles.bookBtnWrapper, appStyles.paddingSm]}>
          <TouchableOpacity
            style={[styles.bookBtn]}
            onPress={() => { navigate('Book', { id: book.id }); }}
          >
            <View style={[styles.thumbnailWrapper]}>
              <Image
                style={[styles.thumbnail]}
                source={{ uri: book.thumbnail, cache: 'force-cache' }}
                resizeMode="cover"
              />
            </View>
            <Text style={[styles.descrText]}>{book.description}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.optionsContainer, appStyles.paddingMd]}>
          <TouchableOpacity
            style={[styles.bookOption, appStyles.boxShadow]}
            onPress={() => { this._onDropdownSelect('Move to new list'); }}
          >
            <Icon
              name="swap"
              size={normalizeFont(20)}
              color={appColors.gray}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bookOption, appStyles.boxShadow]}
            onPress={() => { this._onDropdownSelect('Edit description'); }}
          >
            <Icon
              name="edit"
              size={normalizeFont(20)}
              color={appColors.gray}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bookOption, appStyles.boxShadow]}
            onPress={() => { this._onDropdownSelect('Change banner image'); }}
          >
            <Icon
              name="image"
              size={normalizeFont(20)}
              color={appColors.gray}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bookOption, appStyles.boxShadow]}
            onPress={() => { this._onDropdownSelect('Remove from list'); }}
          >
            <Icon
              name="circle-with-minus"
              size={normalizeFont(20)}
              color={appColors.gray}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
