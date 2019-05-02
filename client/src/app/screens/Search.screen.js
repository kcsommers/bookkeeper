import { EventEmitter } from 'events';
import React from 'react';
import { ScrollView, Button, Text, View } from 'react-native';
import { searchScreenStyles } from '../../assets/styles/screens/searchScreen.styles';
import Book from '../../core/classes/models/Book';
import { HttpService } from '../../core/services/HttpService';
import { GlobalService } from '../../core/services/GlobalService';
import BookSearchResult from '../components/books/BookSearchResult.component';
import SearchBar from '../components/SearchBar.component';
import { appStyles } from '../../assets/styles/appStyles.styles';
import SlideInFromTop from '../components/wrappers/SlideInFromTop.component';

const httpService = Object.create(HttpService);
const globalService = Object.create(GlobalService);

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchTerm: '',
      targetList: '',
      searchBarVisible: false
    };
    this.addBookToList = this.addBookToList.bind(this);
    this.onNavigation = this.onNavigation.bind(this);
    this.showSearchBar = this.showSearchBar.bind(this);
    this.hideSearchbar = this.hideSearchbar.bind(this);
    this.searchEvent = new EventEmitter();
  }

  componentWillMount() {
    this.navSubscription$ = this.props.navigation.addListener('willFocus', this.onNavigation);
    this.searchEvent.addListener('search-done', this.onSearch.bind(this));
  }

  componentWillUnmount() {
    this._resetState();
    this.navSubscription$.remove();
    this.searchEvent.removeAllListeners();
  }

  onNavigation() {
    const targetList = this.props.navigation.getParam('targetList', '');
    const results = this.props.navigation.getParam('results', null);
    this.setState({
      targetList,
      searchResults: results ? results.items : null,
      searchTerm: results ? results.searchTerm : ''
    });
  }

  onSearch(results) {
    this.setState((prevState) => ({
      ...prevState,
      searchResults: results.items,
      searchTerm: results.searchTerm
    }));
  }

  _resetState() {
    this.setState({
      searchResults: null,
      searchTerm: '',
      targetList: null
    });
  }

  showSearchBar() {
    this.searchBar.input.focus();
    this.setState({ searchBarVisible: true });
  }

  hideSearchbar() {
    this.setState({ searchBarVisible: false });
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
      newBook.addToStore(globalService.getStore(), itemData.modelData.listId);
      this.props.navigation.navigate('List', { id: itemData.modelData.listId });
    }).catch((error) => {
      console.error('ERROR CREATING BOOK', error);
    });
  }

  render() {
    const { searchResults, targetList, searchTerm, searchBarVisible } = this.state;
    const searchResultsMapped = (searchResults) ? searchResults.map((result) => (
      <BookSearchResult
        book={result}
        lists={globalService.getStore().getState().lists}
        targetList={targetList}
        addBook={this.addBookToList}
        key={result.previewLink}
      />
    )) : null;
    const topText = (searchResults) ? (
      <View>
        <Text style={[appStyles.h5i, appStyles.paddingSm]}>
          Showing results for
          {' '}
          <Text style={[appStyles.h5]}>{searchTerm}</Text>
        </Text>
        <Button onPress={this.showSearchBar} title="New Search" />
      </View>
    ) : null;
    return (
      <ScrollView contentContainerStyle={searchScreenStyles.container}>
        <SlideInFromTop isVisible={searchBarVisible}>
          <SearchBar
            ref={(e) => { this.searchBar = e; }}
            searchEvent={this.searchEvent}
            onBlur={this.hideSearchbar}
          />
        </SlideInFromTop>
        {topText}
        {searchResultsMapped}
      </ScrollView>
    );
  }
}

export default SearchScreen;