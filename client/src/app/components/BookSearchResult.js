import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink'
  }
});

class BookSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: (this.props.user.lists) ? this.props.user.lists[0] : null,
      book: null
    };
  }

  componentDidMount() {
    this._parseBook();
  }

  _parseBook() {
    const { book } = this.props;
    const authors = book.authors.join(', ');
    const thumbnail = (book.imageLinks)
      ? book.imageLinks.thumbnail.replace(/zoom=1/gi, 'zoom=0')
      : 'https://res.cloudinary.com/kcsommers/image/upload/v1546384882/missingBookCover.jpg';

    this.setState({
      book: {
        title: book.title,
        description: book.description,
        authors,
        thumbnail
      }
    });
  }

  _handleSelectList(list) {
    this.setState({ selectedList: list });
  }

  render() {
    const { user, addFunction } = this.props;
    const { selectedList, book } = this.state;
    const userLists = [];
    user.lists.forEach((list) => { userLists.push({ value: list.name }); });
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={[
              {
                borderWidth: 2,
                borderColor: '#fff',
                borderRadius: 5,
                width: this.props.width,
                height: this.props.height
              }]}
            source={book ? { uri: book.thumbnail, cache: 'force-cache' } : null}
            resizeMode="cover"
          />
          <Text>{book && book.title}</Text>
          <Text>{book && book.authors}</Text>
          <Text>{book && book.description}</Text>
        </View>
        <Dropdown
          label="Select List"
          data={userLists}
          value={(user.lists) ? this.props.user.lists[0].name : 'Select'}
          onChangeText={(list) => { this._handleSelectList(list); }}
        />
        <TouchableOpacity onPress={() => addFunction(book, selectedList)}>
          <Text>Add to List</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(BookSearchResult);