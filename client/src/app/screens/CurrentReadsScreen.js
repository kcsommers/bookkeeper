import React from 'react';
import {
  StyleSheet, View, ScrollView, Text, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import BackgroundImage from '../components/BackgroundImage';
import {
  appColors, appStyles, appWidths, appHeights, normalizeFont, appSpacing
} from '../../assets/styles/appStyles';
import whiteGradient from '../../assets/images/page_backgrounds/whiteGradient.png';
import Book from '../../core/classes/models/Book';
import NotesContainer from '../components/NotesContainer';

const mapStateToProps = (state) => ({ user: state.user, deviceInfo: state.deviceInfo });
const styles = StyleSheet.create({
  container: {
  },
  whiteGradientBg: {
    width: appWidths.full,
    height: appHeights.seventy
  },
  bookInfoContainer: {
    marginTop: appHeights.thirtyFive,
    alignItems: 'center'
  },
  bookOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: appSpacing.lg.y
  },
  bookOptionsBtn: {
    width: appWidths.thirty,
    height: appWidths.thirty,
    borderRadius: appWidths.thirty / 2,
    borderWidth: 1,
    borderColor: appColors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notesContainer: {
    backgroundColor: appColors.offWhite,
    paddingTop: appSpacing.md.y
  }
});

class CurrentReadsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReads: [],
      currentBook: null,
      currentBookIndex: 0
    };
    this._setCurrentReads = this._setCurrentReads.bind(this);
    this._changeCurrentBook = this._changeCurrentBook.bind(this);
    this._navigate = this._navigate.bind(this);
  }

  componentWillMount() {
    this._setCurrentReads();
  }

  _changeCurrentBook(num) {
    const { currentReads, currentBookIndex } = this.state;
    let newIndex = currentBookIndex + num;
    if (newIndex < 0) {
      newIndex = this.currentReads.length - 1;
    } else if (newIndex === this.currentReads.length) {
      newIndex = 0;
    }
    this.setState({ currentBook: currentReads[newIndex], currentBookIndex: newIndex });
  }

  _navigate(routeData) {
    const { path, params } = routeData;
    this.props.navigation.navigate(path, params);
  }

  _setCurrentReads() {
    const { user } = this.props;
    if (user.lists && user.lists.length) {
      const currentReads = [];
      user.lists.forEach((list) => {
        if (list.books && list.books.length) {
          list.books.forEach((book) => {
            if (book.current) {
              const newBook = new Book(
                book.title,
                book.authors,
                book.description,
                book.thumbnail,
                book.banner,
                book.current,
                book.notes,
                book.quotes,
                book.id
              );
              currentReads.push(newBook);
            }
          });
        }
      });
      this.setState({ currentReads, currentBook: currentReads[0] });
    }
  }

  render() {
    const { currentBook } = this.state;
    return (
      <BackgroundImage image={currentBook && currentBook.thumbnail}>
        <ScrollView contentContainerStyle={styles.container}>
          <BackgroundImage image={whiteGradient}>
            <View style={[styles.bookInfoContainer]}>
              <Text style={[appStyles.h1]}>{currentBook && currentBook.title}</Text>
              <Text style={[appStyles.h3i]}>{currentBook && currentBook.authors}</Text>
            </View>
            <View style={[styles.bookOptionsContainer]}>
              <TouchableOpacity
                style={[appStyles.boxShadow, styles.bookOptionsBtn]}
                onPress={() => {
                  this._navigate({ path: 'Notepad', params: { noteType: 'note', icon: 'pencil', bookId: currentBook.id } });
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
                style={[appStyles.boxShadow, styles.bookOptionsBtn]}
                onPress={() => {
                  this._navigate({ path: 'Notepad', params: { noteType: 'quote', icon: 'quote', bookId: currentBook.id } });
                }}
              >
                <Icon
                  name="quote"
                  size={normalizeFont(20)}
                  color={appColors.gray}
                />
                <Text style={[appStyles.label]}>New Quote</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[appStyles.boxShadow, styles.bookOptionsBtn]}>
                <Icon
                  name="check"
                  size={normalizeFont(20)}
                  color={appColors.gray}
                />
                <Text style={[appStyles.label]}>Finished!</Text>
              </TouchableOpacity>
            </View>
          </BackgroundImage>
          <View style={[styles.notesContainer]}>
            <Text style={[appStyles.h3]}>Recent Notes</Text>
            <NotesContainer
              notes={currentBook && currentBook.notes}
              quotes={currentBook && currentBook.quotes}
            />
          </View>
        </ScrollView>
      </BackgroundImage>
    );
  }
}


export default connect(mapStateToProps)(CurrentReadsScreen);