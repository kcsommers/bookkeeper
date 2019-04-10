import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { appColors, appStyles, normalizeFont, appHeights, appSpacing } from '../../assets/styles/appStyles.styles';
import { HttpService } from '../../core/services/HttpService';

const httpService = Object.create(HttpService);
const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.offWhite,
    height: appHeights.ten,
    justifyContent: 'center',
    paddingLeft: appSpacing.lg.x,
    paddingRight: appSpacing.lg.x
  },
  inputWrapper: {
    backgroundColor: appColors.white,
    flexDirection: 'row',
    borderRadius: 50
  },
  searchInput: {
    fontSize: normalizeFont(18),
    flex: 1,
    color: appColors.gray,
    paddingLeft: appSpacing.md.x,
    paddingTop: appSpacing.sm.y,
    paddingBottom: appSpacing.sm.y
  },
  iconBtn: {
    backgroundColor: appColors.gray,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  }
});

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
            returnKeyLabel="Search"
            clearButtonMode="while-editing"
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            selectTextOnFocus={true}
            onChangeText={this._handleChange}
          />
          <TouchableOpacity
            style={[styles.iconBtn, appStyles.paddingSm]}
            onPress={this._doSearch}
          >
            <Icon
              name="magnifying-glass"
              size={normalizeFont(22)}
              color={appColors.offWhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SearchBar;