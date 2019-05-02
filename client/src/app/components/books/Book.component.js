import React from 'react';
import {
  Text, TouchableOpacity, View, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { appColors, appStyles, normalizeFont } from '../../../assets/styles/appStyles.styles';
import { styles } from '../../../assets/styles/components/bookComponent.styles';
// import NotesContainer from '../NotesContainer.component';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCurrentRead = this.toggleCurrentRead.bind(this);
  }

  onConfirmCurrent() {
    this.props.closeModal();
  }

  onConfirmFinished() {
    this.props.closeModal();
  }

  toggleCurrentRead() {
    const { book, userId } = this.props;
    this.props.triggerModal({
      template: 'currentReadToggle',
      content: { book, userId },
      actions: {
        onConfirm: (book.current) ? this.onConfirmFinished.bind(this) : this.onConfirmCurrent.bind(this)
      }
    });
  }

  render() {
    const { book, navigate } = this.props;
    const currentIcon = (book.current) ? 'check' : 'book-open-page-variant';
    return book ? (
      <View>
        <View style={[styles.thumbnailContainer]}>
          <Image
            source={{ uri: book.thumbnail, cache: 'force-cache' }}
            style={[styles.thumbnail]}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.bookInfoContainer]}>
          <Text style={[appStyles.h1]}>{book.title}</Text>
          <Text style={[appStyles.h3i]}>{book.authors}</Text>
        </View>
        <View style={[styles.bookOptionsContainer]}>
          <TouchableOpacity
            style={[appStyles.boxShadow, styles.bookOptionsBtn]}
            onPress={() => {
              navigate('Notepad', { noteType: 'note', icon: 'pencil', bookId: book.id });
            }}
          >
            <Icon
              name="lead-pencil"
              size={normalizeFont(25)}
              color={appColors.teal}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[appStyles.boxShadow, styles.bookOptionsBtn]}
            onPress={() => {
              navigate('Notepad', { noteType: 'quote', icon: 'quote', bookId: book.id });
            }}
          >
            <Icon
              name="format-quote-close"
              size={normalizeFont(25)}
              color={appColors.teal}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[appStyles.boxShadow, styles.bookOptionsBtn]}
            onPress={this.toggleCurrentRead}
          >
            <Icon
              name={currentIcon}
              size={normalizeFont(25)}
              color={appColors.teal}
            />
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }
}

export default Book;