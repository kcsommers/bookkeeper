import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  ScrollView,
  View,
  Keyboard
} from 'react-native';
import SearchPage from '../containers/SearchPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
});

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0
    };
    this._doSearch = this._doSearch.bind(this);
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow(e) {
    const { height } = e.endCoordinates;
    this.setState({ keyboardHeight: height });
  }

  _keyboardWillHide() {
    this.setState({ keyboardHeight: 0 });
  }

  async _doSearch(searchTerm, searchType) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    try {
      const results = await axios.get(url);
      this.props.navigation.navigate('SearchResults', { results: results.data.items, searchType });
    } catch (err) {
      console.error('ERROR FINDING SEARCHRESULTS', err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
        >
          <SearchPage
            searchFunction={this._doSearch}
            screenType="books"
            keyboardHeight={this.state.keyboardHeight}
          />
          <SearchPage
            searchFunction={this._doSearch}
            screenType="users"
            keyboardHeight={this.state.keyboardHeight}
          />
        </ScrollView>
      </View>
    );
  }
}

export default SearchScreen;