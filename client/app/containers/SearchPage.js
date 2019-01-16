import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import axios from 'axios';
import Input from '../widgets/Input';
import BackgroundImageFull from '../widgets/BackgroundImageFull';
import TouchButton from '../widgets/TouchButton';

import { SCREEN_WIDTH } from '../../assets/styles/appStyles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: SCREEN_WIDTH,
    position: 'relative'
  }
});

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this._handleChange = this._handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    const { searchTerm } = this.state;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    try {
      const results = await axios.get(url);
      this.props.navigation.navigate('SearchResults', { results: results.data.items, searchType: 'books' });
    } catch (err) {
      console.error('ERROR FINDING SEARCHRESULTS', err);
    }
  }

  _handleChange(value) {
    this.setState({ searchTerm: value });
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          field="search"
          placeholder="Username"
          handleChange={($value, field) => { this._handleChange($value, field); }}
          isPassword={false}
          isEmail={false}
          keyboardType="default"
          textContentType="username"
        />
        <TouchButton text="Search" handlePress={this.handleSubmit} />
        <BackgroundImageFull image={this.props.background} />
      </View>
    );
  }
}

export default SearchPage;