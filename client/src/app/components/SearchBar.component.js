import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { appColors, appStyles } from '../../assets/styles/appStyles.styles';
import { HttpService } from '../../core/services/HttpService';

const httpService = Object.create(HttpService);

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this._doSearch = this._doSearch.bind(this);
    this._handleChange = this._handleChange.bind(this);
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
          this.props.searchEvent.emit('search-done', { items: books, searchTerm });
        }
      }).catch(error => {
        console.error('ERROR SEARCHING BOOKS', error);
      });
    }
  }

  render() {
    return (
      <View>
        <View style={[appStyles.paddingLg, { backgroundColor: appColors.green }]}>
          <TextInput
            placeholder="Search Books"
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
    );
  }
}

export default SearchBar;