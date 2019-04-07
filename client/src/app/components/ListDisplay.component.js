import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { appColors, appSpacing, appStyles, normalizeFont } from '../../assets/styles/appStyles.styles';
import { styles } from '../../assets/styles/components/listDisplay.styles';
import { ScreenService } from '../../core/services/ScreenService';

const screenService = Object.create(ScreenService);

class ListDisplay extends React.Component {
  _getBooks(books) {
    return books.map(book => (
      <Image
        key={book.id}
        style={[styles.thumbnail, {
          marginRight: books.length < 3 ? appSpacing.md.x : 0
        }]}
        source={{ uri: book.thumbnail, cache: 'force-cache' }}
        resizeMode="cover"
      />
    ));
  }

  render() {
    const { list, navigate } = this.props;
    const books = screenService.getItemsById('books', list.bookIds);
    const booksMapped = this._getBooks(books);
    return (
      <TouchableOpacity
        onPress={() => navigate('List', { id: list.id })}
        style={[appStyles.boxShadow, appStyles.paddingMd, styles.listCard]}
      >
        <Text style={[appStyles.h5]}>{list.name}</Text>
        <View style={[styles.thumbnailsWrapper, {
          justifyContent: books.length < 3 ? 'flex-start' : 'space-between'
        }]}
        >
          {booksMapped}
          <TouchableOpacity style={[styles.addBtn, styles.thumbnail]}>
            <View style={[styles.addBtnIconWrapper, appStyles.boxShadow]}>
              <Icon
                name="plus"
                size={normalizeFont(30)}
                color={appColors.blue}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ListDisplay;