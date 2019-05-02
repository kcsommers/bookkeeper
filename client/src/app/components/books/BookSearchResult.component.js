import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { styles } from '../../../assets/styles/components/bookSearchResult.styles';
import { appStyles } from '../../../assets/styles/appStyles.styles';

class BookSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLists: [],
      targetList: null
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
      targetList: this.props.targetList || listsArr[0],
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
    const { targetList, parsedBook } = this.state;
    if (targetList) {
      const itemData = {
        title: parsedBook.title,
        authors: parsedBook.authors,
        description: parsedBook.description,
        thumbnail: parsedBook.thumbnail
      };
      const modelData = {
        listId: targetList.id
      };
      this.props.addBook({ itemData, modelData });
    }
  }

  _getList(listName) {
    return this.state.userLists.find(list => list.name === listName);
  }

  _onSelectList(listName) {
    this.setState({ targetList: this._getList(listName) });
  }

  render() {
    const { targetList, userLists, parsedBook } = this.state;
    const { authors, thumbnail, title, description } = parsedBook;
    const titleSize = title.length > 15 ? appStyles.h4 : appStyles.h3;
    return (
      <View style={[styles.container]}>
        <View style={[appStyles.paddingSm, styles.topWrapper]}>
          <Image
            style={[styles.thumbnail]}
            source={{ uri: thumbnail, cache: 'force-cache' }}
            resizeMode="cover"
          />
          <View style={[styles.detailsContainer, appStyles.paddingSm]}>
            <Text style={[titleSize]}>{title}</Text>
            <Text style={[appStyles.h5i]}>{authors}</Text>
            <Dropdown
              label="Select List"
              data={userLists.map(list => ({ value: list.name }))}
              value={targetList.name || 'Select'}
              onChangeText={(list) => { this._onSelectList(list); }}
            />
            <TouchableOpacity
              style={[appStyles.buttonAqua]}
              onPress={this._addBook}
            >
              <Text style={[appStyles.buttonTextSm]}>Add to List</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[appStyles.p, appStyles.paddingSm]}>{description}</Text>
      </View>
    );
  }
}

export default BookSearchResult;