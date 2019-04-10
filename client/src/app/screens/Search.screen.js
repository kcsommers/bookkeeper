import { EventEmitter } from 'events';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { searchScreenStyles } from '../../assets/styles/screens/searchScreen.styles';
import Book from '../../core/classes/models/Book';
import { HttpService } from '../../core/services/HttpService';
import { ScreenService } from '../../core/services/ScreenService';
import BookSearchResult from '../components/BookSearchResult.component';
import SearchBar from '../components/SearchBar.component';

const httpService = Object.create(HttpService);
const screenService = Object.create(ScreenService);

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchTerm: '',
      targetList: ''
    };
    this.addBookToList = this.addBookToList.bind(this);
    this._onNavigation = this._onNavigation.bind(this);
    this.searchEvent = new EventEmitter();
  }

  componentWillMount() {
    this.navSubscription$ = this.props.navigation.addListener('willFocus', this._onNavigation);
    this.searchEvent.addListener('search-done', this.onSearch.bind(this));
  }

  componentWillUnmount() {
    this.navSubscription$.remove();
    this.searchEvent.removeAllListeners();
  }

  onSearch(results) {
    this.setState((prevState) => ({
      ...prevState,
      searchResults: results.items,
      searchTerm: results.searchTerm
    }));
  }

  _onNavigation() {
    const targetList = this.props.navigation.getParam('targetList', '');
    const results = this.props.navigation.getParam('results', null);
    this.setState({
      targetList,
      searchResults: results ? results.items : null,
      searchTerm: results ? results.searchTerm : ''
    });
  }

  addBookToList(itemData) {
    httpService.create('books', itemData).then((createdBook) => {
      const newBook = new Book(
        createdBook.id,
        createdBook.title,
        createdBook.authors,
        createdBook.description,
        createdBook.thumbnail,
        createdBook.banner,
        createdBook.current,
        [], []
      );
      newBook.addToStore(screenService.getStore(), itemData.modelData.listId);
      this.props.navigation.navigate('List', { id: itemData.modelData.listId });
    }).catch((error) => {
      console.error('ERROR CREATING BOOK', error);
    });
  }

  render() {
    const { searchResults, targetList } = this.state;
    const searchResultsMapped = (searchResults) ? searchResults.map((result) => (
      <BookSearchResult
        book={result}
        lists={screenService.getStore().getState().lists}
        targetList={targetList}
        addBook={this.addBookToList}
        key={result.previewLink}
      />
    )) : null;
    return (
      <ScrollView contentContainerStyle={searchScreenStyles.container}>
        <View style={[searchScreenStyles.searchFormContainer]}>
          <SearchBar searchEvent={this.searchEvent} />
        </View>

        {searchResultsMapped}
      </ScrollView>

    );
  }
}

export default SearchScreen;