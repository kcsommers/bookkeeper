import React from 'react';
import {
  ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import whiteGradient from '../../assets/images/page_backgrounds/whiteGradient.png';
import { appColors, appStyles, normalizeFont } from '../../assets/styles/appStyles.styles';
import { bookStyles } from '../../assets/styles/components/bookComponent.styles';
import BackgroundImage from './BackgroundImage.component';
import NotesContainer from './NotesContainer.component';

class Book extends React.Component {
  render() {
    const { book, navigate } = this.props;
    return (
      <BackgroundImage
        height="100%"
        image={book && book.thumbnail}
      >
        <ScrollView contentContainerStyle={bookStyles.container}>
          <BackgroundImage
            height="auto"
            image={whiteGradient}
          >
            <View style={[bookStyles.bookInfoContainer]}>
              <Text style={[appStyles.h1]}>{book && book.title}</Text>
              <Text style={[appStyles.h3i]}>{book && book.authors}</Text>
            </View>
            <View style={[bookStyles.bookOptionsContainer]}>
              <TouchableOpacity
                style={[appStyles.boxShadow, bookStyles.bookOptionsBtn]}
                onPress={() => {
                  navigate('Notepad', { noteType: 'note', icon: 'pencil', bookId: book.id });
                }}
              >
                <Icon
                  name="pencil"
                  size={normalizeFont(20)}
                  color={appColors.gray}
                />
                <Text style={[appStyles.label]}>New Note</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[appStyles.boxShadow, bookStyles.bookOptionsBtn]}
                onPress={() => {
                  navigate('Notepad', { noteType: 'quote', icon: 'quote', bookId: book.id });
                }}
              >
                <Icon
                  name="quote"
                  size={normalizeFont(20)}
                  color={appColors.gray}
                />
                <Text style={[appStyles.label]}>New Quote</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[appStyles.boxShadow, bookStyles.bookOptionsBtn]}>
                <Icon
                  name="check"
                  size={normalizeFont(20)}
                  color={appColors.gray}
                />
                <Text style={[appStyles.label]}>Finished!</Text>
              </TouchableOpacity>
            </View>
          </BackgroundImage>
          <View style={[appStyles.paddingSm, bookStyles.notesContainer]}>
            <NotesContainer noteIds={book.noteIds} quoteIds={book.quoteIds} />
          </View>
        </ScrollView>
      </BackgroundImage>
    );
  }
}

export default Book;