import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { appColors, appSpacing, appStyles, appWidths } from '../../../assets/styles/appStyles.styles';
import { componentStyles } from '../../../assets/styles/lists/listStyles.styles';
import { AlertsService } from '../../../core/services/AlertsService';
import { GlobalService } from '../../../core/services/GlobalService';
import { HttpService } from '../../../core/services/HttpService';
import BkDropdown from '../BkDropdown.component';

const httpService = Object.create(HttpService);
const alertsService = Object.create(AlertsService);
const globalService = Object.create(GlobalService);

export default class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.thumbnailAnim = new Animated.Value(1);
    this.fadeInAnim = new Animated.Value(1);
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this._cancelDelete = this._cancelDelete.bind(this);
    this._getBooksContainerStyles = this._getBooksContainerStyles.bind(this);
    this._getBookDisplays = this._getBookDisplays.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  onDropdownSelect(value) {
    if (value.action === 'remove') {
      const template = 'confirmDelete';
      const content = {
        id: value.id,
        text: 'Deleting this book will also delete its notes. If you\'d like to save them, move this book to another list.'
      };
      const actions = {
        delete: this.deleteBook.bind(this),
        cancel: this._cancelDelete.bind(this)
      };
      this.props.triggerModal({ template, content, actions });
    }
  }

  triggerDelete() {
    const template = 'confirmDelete';
    const content = {
      id: this.props.list.id,
      text: 'All of the books on this list will be deleted. If you\'d like to save your notes, be sure to move each book to another list.'
    };
    const actions = {
      delete: this.deleteList.bind(this),
      cancel: this._cancelDelete.bind(this)
    };
    this.props.triggerModal({ template, content, actions });
  }

  deleteList() {
    this.props.closeModal();
    const { list } = this.props;
    httpService.delete(`lists/${list.id}`).then(result => {
      if (result.success) {
        alertsService.createAlert('List Deleted', 'check');
        list.removeFromStore(globalService.getStore());
        this.props.navigate('Profile', null);
      }
    }).catch(error => {
      console.error('ERROR DELEING LIST', error);
      // :::: TODO :::: (error handle)
    });
  }

  deleteBook(bookId) {
    const bookToRemove = globalService.getStore().getState().books[bookId];
    if (bookToRemove) {
      httpService.delete(`books/${bookId}`).then(result => {
        if (result.success) {
          alertsService.createAlert('Book Deleted', 'check');
          bookToRemove.removeFromStore(globalService.getStore(), this.state.list.id);
          this.props.closeModal();
        }
      });
    } else {
      // :::: TODO :::: (error handle)
    }
  }

  changeDisplay(display) {
    this.thumbnailAnim.setValue(0);
    this.fadeInAnim.setValue(0);
    if (display === 'titles') {
      Animated.timing(this.fadeInAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      Animated.parallel([
        Animated.timing(this.fadeInAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(this.thumbnailAnim, {
          toValue: 1,
          duration: 300
        })
      ]).start();
    }
  }

  _cancelDelete() {
    this.props.closeModal();
  }

  _getBooksContainerStyles() {
    const { booksDisplay } = this.props;
    if (booksDisplay === 'full') {
      return componentStyles.booksContainerCol;
    }
    if (booksDisplay === 'grid') {
      return componentStyles.booksContainerRow;
    }
    if (booksDisplay === 'titles') {
      return componentStyles.booksContainerTitles;
    }
    return null;
  }

  _getBookDisplays(books, display) {
    let widthRange, heightRange;
    if (display === 'full') {
      widthRange = [appWidths.sixty, appWidths.seventy];
      heightRange = [appWidths.sixty * 1.54, appWidths.seventy * 1.54];
    } else if (display === 'grid') {
      widthRange = [appWidths.thirty, appWidths.fortyFive];
      heightRange = [appWidths.thirtyFive * 1.54, appWidths.fortyFive * 1.54];
    }
    if (display === 'full' || display === 'grid') {
      return books && books.map(book => (
        <View style={[componentStyles.bookWrapper]} key={book.id}>
          <TouchableOpacity
            key={book.id}
            style={[componentStyles.thumbnailBtn, appStyles.boxShadow]}
            onPress={() => { this.props.navigate('Book', { id: book.id }); }}
          >
            <Animated.View style={[componentStyles.thumbnailWrapper, {
              width: this.thumbnailAnim.interpolate({ inputRange: [0, 1], outputRange: widthRange }),
              height: this.thumbnailAnim.interpolate({ inputRange: [0, 1], outputRange: heightRange }),
            }]}
            >
              <Image
                style={[componentStyles.thumbnail]}
                source={{ uri: book.thumbnail, cache: 'force-cache' }}
                resizeMode="cover"
              />
            </Animated.View>
          </TouchableOpacity>
          <View style={[componentStyles.dropdownContainer]}>
            <BkDropdown
              data={[
                { label: 'Move to new list', value: { action: 'move', id: book.id } },
                { label: 'Remove book from list', value: { action: 'remove', id: book.id } },
              ]}
              buttonLabel="Options"
              onSelect={this.onDropdownSelect}
            />
          </View>
        </View>
      ));
    }
    if (display === 'titles') {
      return books && books.map(book => (
        <View style={{ paddingHorizontal: appSpacing.md.x }} key={book.id}>
          <TouchableOpacity
            onPress={() => { this.props.navigate('Book', { id: book.id }); }}
            style={[componentStyles.bookWrapper, {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: appColors.aqua,
              borderBottomWidth: 2,
              paddingBottom: appSpacing.sm.y
            }]}
          >
            <View>
              <Text style={[appStyles.h3]}>{book.title}</Text>
              <Text style={[appStyles.h5i]}>{book.authors}</Text>
            </View>
            <BkDropdown
              data={[
                { label: 'Move to new list', value: { action: 'move', id: book.id } },
                { label: 'Remove book from list', value: { action: 'remove', id: book.id } },
              ]}
              icon="dots-horizontal"
              onSelect={this.onDropdownSelect}
              explicitWidth={appWidths.forty}
            />
          </TouchableOpacity>
        </View>
      ));
    }
    return null;
  }

  render() {
    const { list, books, booksDisplay } = this.props;
    const booksMapped = books && this._getBookDisplays(books, booksDisplay);
    const booksContainerStyles = this._getBooksContainerStyles();
    return (
      <View style={componentStyles.container}>
        <View style={[componentStyles.listNameContainer]}>
          <Text style={[appStyles.h2, componentStyles.listName]}>{list && list.name}</Text>
        </View>
        <Animated.View style={{
          flex: 1,
          opacity: this.fadeInAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
          })
        }}
        >
          <View style={[booksContainerStyles, { marginBottom: appSpacing.md.y }]}>
            {list && books.length ? booksMapped : (
              <Text style={[appStyles.h3i, appStyles.paddingMd, { alignSelf: 'stretch' }]}>No books yet!</Text>
            )}
          </View>
          {(list && list.id > 0) && (
            <TouchableOpacity
              style={[componentStyles.deleteBtn]}
              onPress={this.triggerDelete}
            >
              <Text style={[componentStyles.deleteBtnText]}>Delete List</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    );
  }
}