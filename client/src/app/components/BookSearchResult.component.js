import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { appWidths, appColors } from '../../assets/styles/appStyles.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
  },
  thumbnail: {
    borderWidth: 2,
    borderColor: appColors.offWhite,
    borderRadius: 5,
    width: appWidths.twentyFive,
    height: appWidths.twentyFive * 1.54
  }
});

class BookSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLists: [],
      selectedList: null
    };
    this._addBook = this._addBook.bind(this);
    this._parseBook = this._parseBook.bind(this);
    this._onSelectList = this._onSelectList.bind(this);
  }

  componentWillMount() {
    const listsArr = [];
    Object.keys(this.props.lists).forEach(key => {
      listsArr.push(this.props.lists[key]);
    });
    this.setState({
      userLists: listsArr,
      selectedList: listsArr[0],
      parsedBook: this._parseBook()
    });
  }

  _parseBook() {
    const { book } = this.props;
    const authors = (book.authors) ? book.authors.join(', ') : '';
    const thumbnail = (book.imageLinks)
      ? book.imageLinks.thumbnail.replace(/zoom=1/gi, 'zoom=0')
      : 'https://res.cloudinary.com/kcsommers/image/upload/v1546384882/missingBookCover.jpg';
    const title = (book.title) ? book.title : '';
    const description = (book.description) ? book.description : '';
    return { authors, thumbnail, title, description };
  }

  _addBook() {
    const { selectedList, parsedBook } = this.state;
    if (selectedList) {
      const itemData = {
        title: parsedBook.title,
        authors: parsedBook.authors,
        description: parsedBook.description,
        thumbnail: parsedBook.thumbnail
      };
      const modelData = {
        listId: selectedList.id
      };
      this.props.addBook({ itemData, modelData });
    }
  }

  _getList(listName) {
    return this.state.userLists.find(list => list.name === listName);
  }

  _onSelectList(listName) {
    this.setState({ selectedList: this._getList(listName) });
  }

  render() {
    const { selectedList, userLists, parsedBook } = this.state;
    const { authors, thumbnail, title, description } = parsedBook;
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={[styles.thumbnail]}
            source={{ uri: thumbnail, cache: 'force-cache' }}
            resizeMode="cover"
          />
          <Text>{title}</Text>
          <Text>{authors}</Text>
          <Text>{description}</Text>
        </View>
        <Dropdown
          label="Select List"
          data={userLists.map(list => ({ value: list.name }))}
          value={selectedList.name || 'Select'}
          onChangeText={(list) => { this._onSelectList(list); }}
        />
        <TouchableOpacity onPress={this._addBook}>
          <Text>Add to List</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BookSearchResult;