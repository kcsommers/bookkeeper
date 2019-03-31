import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { ScreenService } from '../../core/services/ScreenService';
import BookDisplay from '../components/BookDisplay.component';

const screenService = Object.create(ScreenService);
const mapStateToProps = (state) => ({ lists: state.lists });

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
    this._onNavigation = this._onNavigation.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {
    this.navSubscription$ = this.props.navigation.addListener('willFocus', this._onNavigation);
  }

  componentWillUnmount() {
    this.navSubscription$.remove();
  }

  _onNavigation() {
    const listId = this.props.navigation.getParam('id');
    const list = this.props.lists[listId];
    this.setState({ list });
  }

  navigate(path, params) {
    this.props.navigation.navigate(path, params);
  }

  _getBooksDisplays(books) {
    return books && books.map(book => (
      <BookDisplay
        key={book.id}
        book={book}
        navigate={this.navigate}
      />
    ));
  }

  render() {
    const { list } = this.state;
    const books = list && screenService.getItemsById('books', list.bookIds);
    const booksMapped = this._getBooksDisplays(books);
    return (
      <ScrollView>
        <View>
          <Text>{list && list.name}</Text>
        </View>
        <View>
          {list && booksMapped}
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(ListScreen);