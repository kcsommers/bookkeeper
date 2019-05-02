import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { appColors, appStyles, normalizeFont } from '../../assets/styles/appStyles.styles';
import { styles } from '../../assets/styles/components/searchBar.styles';
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
      <View style={[styles.container]}>
        <View style={[styles.inputWrapper, appStyles.boxShadow]}>
          <TextInput
            style={[styles.searchInput]}
            placeholder=""
            placeholderTextColor={appColors.gray}
            returnKeyType="search"
            clearButtonMode="while-editing"
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            selectTextOnFocus={true}
            onChangeText={this._handleChange}
            onSubmitEditing={this._doSearch}
            onBlur={this.props.onBlur}
            ref={e => { this.input = e; }}
          />
          <View
            style={[styles.searchIconWrapper, appStyles.paddingSm]}
            onPress={this._doSearch}
          >
            <Icon
              name="magnifying-glass"
              size={normalizeFont(24)}
              color={appColors.gray}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default SearchBar;