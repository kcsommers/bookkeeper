import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { appStyles, appSpacing, appColors, appWidths } from '../../assets/styles/appStyles.styles';
import { ScreenService } from '../../core/services/ScreenService';

const screenService = Object.create(ScreenService);
const styles = StyleSheet.create({
  thumbnail: {
    width: appWidths.twenty,
    height: appWidths.twenty * 1.54
  }
});

class ListDisplay extends React.Component {
  _getBooks(books) {
    return books.map(book => (
      <Image
        key={book.id}
        style={[styles.thumbnail]}
        source={{ uri: book.thumbnail, cache: 'force-cache' }}
        resizeMode="cover"
      />
    ));
  }

  render() {
    const { list, onPress } = this.props;
    const books = screenService.getItemsById('books', list.bookIds);
    const booksMapped = this._getBooks(books);
    return (
      <TouchableOpacity
        onPress={() => onPress(list.id)}
        style={[appStyles.boxShadow, appStyles.paddingMd, {
          marginBottom: appSpacing.lg.y,
          backgroundColor: appColors.white
        }]}
      >
        <Text>{list.name}</Text>
        {booksMapped}
      </TouchableOpacity>
    );
  }
}

export default ListDisplay;