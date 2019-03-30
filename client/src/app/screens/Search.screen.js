import React from 'react';
import {
  ScrollView, TextInput, TouchableOpacity, Text, View
} from 'react-native';
import { appColors, appStyles } from '../../assets/styles/appStyles.styles';
import { searchScreenStyles } from '../../assets/styles/searchScreen.styles';
import { HttpService } from '../../core/services/HttpService';
import { ScreenService } from '../../core/services/ScreenService';
import BookSearchResult from '../components/BookSearchResult.component';
import Book from '../../core/classes/models/Book';

const httpService = Object.create(HttpService);
const screenService = Object.create(ScreenService);

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: []
    };
    this._doSearch = this._doSearch.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.addBookToList = this.addBookToList.bind(this);
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

  _handleChange(value) {
    this.setState({ searchTerm: value });
  }

  _doSearch() {
    const { searchTerm } = this.state;
    if (searchTerm) {
      httpService.searchBooks(searchTerm).then((results) => {
        if (results.books) {
          const books = [];
          results.books.forEach((book) => {
            books.push(book.volumeInfo);
          });
          this.setState({ searchResults: books });
        } else {
          console.error('ERROR SEARCHING BOOKS');
        }
      });
    }
  }

  render() {
    const { searchResults } = this.state;
    const searchResultsMapped = (searchResults) ? searchResults.map((result) => (
      <BookSearchResult
        book={result}
        lists={screenService.getStore().getState().lists}
        addBook={this.addBookToList}
        key={result.previewLink}
      />
    )) : null;
    return (
      <ScrollView contentContainerStyle={searchScreenStyles.container}>
        <View style={[searchScreenStyles.searchFormContainer]}>
          <View style={[appStyles.paddingLg, { backgroundColor: appColors.green }]}>
            <TextInput
              placeholder="Title, author or ISBN"
              placeholderTextColor={appColors.offWhite}
              returnKeyLabel="Search"
              clearButtonMode="while-editing"
              blurOnSubmit={true}
              enablesReturnKeyAutomatically={true}
              selectTextOnFocus={true}
              onChangeText={this._handleChange}
            />
          </View>

          <TouchableOpacity
            style={[appStyles.paddingLg, { backgroundColor: appColors.red }]}
            onPress={this._doSearch}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>

        {searchResultsMapped}
      </ScrollView>

    );
  }
}

export default SearchScreen;