import React from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import BookImage from '../widgets/BookImage';
import TouchButton from '../widgets/TouchButton';
import missingBookCover from '../../assets/images/missingBookCover.jpg';

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

  _addBook() {

  }

  render() {
    const { book, user } = this.props;
    const {
      title, authors, description, imageLinks
    } = book;
    let { thumbnail } = (imageLinks) || null;
    thumbnail = (thumbnail) ? thumbnail.replace(/zoom=1/gi, 'zoom=0') : missingBookCover;

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
          handlePress={this._addBook}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(BookResult);