import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { appColors, appStyles } from '../../assets/styles/appStyles';
import HttpService from '../../core/services/HttpService';
import BookSearchResult from '../components/BookSearchResult';

const http = new HttpService();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.blue,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {
        searchTerm: ''
      },
      searchResults: []
    };
    this._doSearch = this._doSearch.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  addBookToList(book, list) {
    console.log('LISTTT', list);
    const httpData = {
      itemData: book,
      miscData: {
        listId: list.id
      }
    };
    http.create('books', httpData).then((result) => {
      console.log('WE DID IT?', result);
    }).catch((error) => {
      console.warn('ERROR CREATING BOOK', error);
    });
  }

  _handleChange(value, field) {
    this.setState((prevState) => ({
      inputValues: {
        ...prevState.inputValues,
        [field]: value
      }
    }));
  }

  _doSearch() {
    const { inputValues } = this.state;
    if (inputValues.searchTerm) {
      http.searchBooks(inputValues.searchTerm).then((results) => {
        console.log('SEARCH RESULTS', results);
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
    console.log('SEARCH RESLTS', searchResults[0]);
    const searchResultsMapped = (searchResults) ? searchResults.map((result) => (
      <BookSearchResult
        book={result}
        addFunction={this.addBookToList}
        key={result.previewLink}
      />
    )) : null;
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        pagingEnabled={true}
        horizontal={true}
      >
        <View style={[appStyles.paddingLg, { backgroundColor: appColors.green }]}>
          <TextInput
            placeholder="Title, author or ISBN"
            placeholderTextColor={appColors.offWhite}
            returnKeyLabel="Search"
            clearButtonMode="while-editing"
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            selectTextOnFocus={true}
            onChangeText={(value) => { this._handleChange(value, 'searchTerm'); }}
          />
        </View>


        <TouchableOpacity
          style={[appStyles.paddingLg, { backgroundColor: appColors.red }]}
          onPress={this._doSearch}
        >
          <Text>Search</Text>
        </TouchableOpacity>
        {searchResultsMapped}
      </ScrollView>

    );
  }
}

export default SearchScreen;