import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { ScreenService } from '../../core/services/ScreenService';

const screenService = Object.create(ScreenService);
const mapStateToProps = (state) => ({ lists: state.lists });

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
    this._onNavigation = this._onNavigation.bind(this);
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

  _navigate(path, params) {
    this.props.navigation.navigate(path, params);
  }

  render() {
    const { list } = this.state;
    const books = list && screenService.getItemsById('books', list.bookIds);
    const booksMapped = list && books.map((book) => (
      <View key={book.id}>
        <TouchableOpacity onPress={() => { this._navigate('Book', { id: book.id }); }}>
          <Text>{book.title}</Text>
        </TouchableOpacity>
      </View>
    ));
    return (
      <View>
        <Text>LIST SCREEN</Text>
        <View>
          <Text>{list && list.name}</Text>
        </View>
        <View>
          {list && booksMapped}
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ListScreen);