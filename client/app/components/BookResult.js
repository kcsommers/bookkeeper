import React from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import BookImage from '../widgets/BookImage';
import TouchButton from '../widgets/TouchButton';
import Environment from '../../environment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink'
  }
});

class BookResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: (this.props.user.lists) ? this.props.user.lists[0].name : 'Select'
    };
  }

  _handleSelect(selectedList) {
    this.setState({ selectedList });
  }

  async _addBook(bookData) {
    const url = `${Environment.BASE_URL}/books`;
    const listId = this.props.user.lists.find((list) => (
      list.name === this.state.selectedList
    )).id;
    const returnedData = await axios.post(url, { bookData, listId });
    return returnedData.data;
  }

  render() {
    const { book, user } = this.props;
    const {
      title, authors, description, imageLinks
    } = book;
    let thumbnail = (imageLinks) ? imageLinks.thumbnail : null;
    thumbnail = (thumbnail) ? thumbnail.replace(/zoom=1/gi, 'zoom=0') : 'https://res.cloudinary.com/kcsommers/image/upload/v1546384882/missingBookCover.jpg';

    const userLists = [];
    user.lists.forEach((list) => { userLists.push({ value: list.name }); });
    return (
      <View style={styles.container}>
        <View>
          <BookImage source={thumbnail} size="large" />
          <Text>{title}</Text>
          <Text>{authors.join(', ')}</Text>
          <Text>{description}</Text>
        </View>
        <Dropdown
          label="Select List"
          data={userLists}
          value={this.state.selectedList}
          onChangeText={(list) => { this._handleSelect(list); }}
        />
        <TouchButton
          text="Add Book"
          type="primary"
          handlePress={() => {
            this._addBook({
              title, authors: authors.join(', '), description, thumbnail
            }).then((bookData) => {
              console.log('BOOOK ADDED DATA', bookData);
            });
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(BookResult);