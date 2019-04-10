import { EventEmitter } from 'events';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { AlertsService } from '../../core/services/AlertsService';
import { HttpService } from '../../core/services/HttpService';
import { ScreenService } from '../../core/services/ScreenService';
import SearchBar from '../components/SearchBar.component';
import { screenWrapper } from '../wrappers/ScreenWrapper.hoc';
import { styles } from '../../assets/styles/screens/listScreen.styles';
import { appStyles, normalizeFont, appColors } from '../../assets/styles/appStyles.styles';

const screenService = Object.create(ScreenService);
const httpService = Object.create(HttpService);
const alertsService = Object.create(AlertsService);
const mapStateToProps = (state) => ({ lists: state.lists });

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
    this.onNavigation = this.onNavigation.bind(this);
    this.navigate = this.navigate.bind(this);
    this._getBookDisplays = this._getBookDisplays.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.modalTrigger$ = new EventEmitter();
    this.searchEvent = new EventEmitter();
    this.triggerDelete = this.triggerDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  componentWillMount() {
    this.modalTrigger$.addListener('trigger-modal', this.triggerModal.bind(this));
    this.modalTrigger$.addListener('close-modal', this.closeModal.bind(this));
    this.searchEvent.addListener('search-done', this.onSearch.bind(this));
  }

  componentWillUnmount() {
    this.modalTrigger$.removeAllListeners();
    this.searchEvent.removeAllListeners();
  }

  onSearch(results) {
    this.props.navigation.navigate('Search', { results, targetList: this.state.list });
  }

  onNavigation() {
    const listId = this.props.navigation.getParam('id');
    const list = this.props.lists[listId];
    this.setState({ list });
  }

  navigate(path, params) {
    this.props.navigate(path, params);
  }

  triggerModal(args) {
    this.props.triggerModal(args.template, args.content, args.actions);
  }

  triggerDelete() {
    const template = 'confirmDelete';
    const content = { id: this.state.list.id, text: 'This action cannot be undone' };
    const actions = {
      delete: this.deleteList.bind(this),
      cancel: this.cancelDelete.bind(this)
    };
    this.triggerModal({ template, content, actions });
  }

  closeModal() {
    this.props.closeModal();
  }

  _getBookDisplays(books) {
    return books && books.map(book => (
      <View style={styles.bookWrapper} key={book.id}>
        {/* <View style={[styles.bookOptionsContainer, appStyles.paddingMd]}>
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
        </View> */}
        <TouchableOpacity
          key={book.id}
          style={[styles.thumbnailBtn, appStyles.boxShadow]}
          onPress={() => { this.navigate('Book', { id: book.id }); }}
        >
          <Image
            style={[styles.thumbnail]}
            source={{ uri: book.thumbnail, cache: 'force-cache' }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    ));
  }

  cancelDelete() {
    this.closeModal();
  }

  deleteList() {
    const { list } = this.state;
    httpService.delete(`lists/${list.id}`).then(result => {
      if (result.success) {
        alertsService.createAlert('List Deleted', 'check');
        list.removeFromStore(screenService.getStore());
        this.props.navigation.navigate('Profile');
      }
    }).catch(error => {
      console.error('ERROR DELEING LIST', error);
    });
  }

  render() {
    const { list } = this.state;
    const books = list && screenService.getItemsById('books', list.bookIds);
    const booksMapped = this._getBookDisplays(books);
    return (
      <View>
        <SearchBar searchEvent={this.searchEvent} />
        <Text style={[appStyles.h3, styles.listName]}>{list && list.name}</Text>
        {list && booksMapped}
        <TouchableOpacity
          style={[styles.deleteBtn]}
          onPress={this.triggerDelete}
        >
          <Text style={[styles.deleteBtnText]}>Delete List</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(mapStateToProps)(screenWrapper(ListScreen));