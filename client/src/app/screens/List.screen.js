import { EventEmitter } from 'events';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { AlertsService } from '../../core/services/AlertsService';
import { HttpService } from '../../core/services/HttpService';
import { ScreenService } from '../../core/services/ScreenService';
import BookDisplay from '../components/BookDisplay.component';
import SearchBar from '../components/SearchBar.component';
import { screenWrapper } from './ScreenWrapper.hoc';

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
    this._deleteList = this._deleteList.bind(this);
    this.modalTrigger$ = new EventEmitter();
    this.searchEvent = new EventEmitter();
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

  closeModal() {
    this.props.closeModal();
  }

  _getBookDisplays(books) {
    return books && books.map(book => (
      <BookDisplay
        key={book.id}
        book={book}
        listId={this.state.list.id}
        navigate={this.navigate}
        modalTrigger={this.modalTrigger$}
      />
    ));
  }

  _deleteList() {
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
        <Text>{list && list.name}</Text>
        <TouchableOpacity onPress={this._deleteList}>
          <Text>Delete List</Text>
        </TouchableOpacity>
        <SearchBar searchEvent={this.searchEvent} />
        {list && booksMapped}
      </View>

    );
  }
}

export default connect(mapStateToProps)(screenWrapper(ListScreen));