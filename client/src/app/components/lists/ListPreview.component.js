import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { appColors, appSpacing, appStyles, normalizeFont } from '../../../assets/styles/appStyles.styles';
import { previewStyles } from '../../../assets/styles/lists/listStyles.styles';
import { ScreenService } from '../../../core/services/ScreenService';

const screenService = Object.create(ScreenService);

export default class ListPreview extends React.Component {
  _getBooks(books) {
    return books.map((book, i) => {
      if (i < 3) {
        return (
          <Image
            key={book.id}
            style={[previewStyles.thumbnail, appStyles.boxShadow, {
              marginRight: books.length < 3 ? appSpacing.md.x : 0
            }]}
            source={{ uri: book.thumbnail, cache: 'force-cache' }}
            resizeMode="cover"
          />
        );
      }
      return null;
    });
  }

  render() {
    const { list, navigate, showSearchBar } = this.props;
    const books = screenService.getItemsById('books', list.bookIds);
    const booksMapped = this._getBooks(books);
    return (
      <TouchableOpacity
        onPress={() => navigate('List', { id: list.id })}
        style={[appStyles.boxShadow, appStyles.paddingMd, previewStyles.listCard]}
      >
        <Text style={[appStyles.h5]}>{list.name}</Text>
        <View style={[previewStyles.thumbnailsWrapper, {
          justifyContent: books.length < 3 ? 'flex-start' : 'space-between'
        }]}
        >
          {booksMapped}
          <TouchableOpacity
            style={[previewStyles.addBtn, previewStyles.thumbnail]}
            onPress={() => { showSearchBar(list); }}
          >
            <View style={[previewStyles.addBtnIconWrapper, appStyles.boxShadow]}>
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
