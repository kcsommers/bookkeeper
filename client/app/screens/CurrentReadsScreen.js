import React from 'react';
import {
  Animated, Keyboard, StyleSheet, View
} from 'react-native';
import { connect } from 'react-redux';
import tealWhiteGradient from '../../assets/images/page_backgrounds/tealWhiteGradient.png';
import { AppStyling } from '../../assets/styles/appStyles';
import Carousel from '../components/Carousel';
import ClickMenu from '../components/ClickMenu';
import NoteInput from '../components/NoteInput';
import TextCard from '../components/TextCard';
import BackgroundImageFull from '../widgets/BackgroundImageFull';

const AppStyles = new AppStyling();
const globalStyles = AppStyles.getAppStyles();

const styles = StyleSheet.create({
  carouselContainer: {
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  noteCardWrapper: {
    paddingTop: globalStyles.paddingSm.y,
    paddingBottom: globalStyles.paddingSm.y,
    marginBottom: globalStyles.paddingSm.y,
    marginTop: globalStyles.paddingSm.y,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%'
  },
  menuBtn: {
    alignItems: 'center',
    paddingTop: globalStyles.paddingMd.y,
    paddingBottom: globalStyles.paddingMd.y,
    backgroundColor: '#fff'
  },
  input: {
    fontFamily: 'Merriweather'
  }
});

class CurrentReadsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null,
      keyboardVisible: false
    };
    this.scrollViewAnim = new Animated.Value(0);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this._handleMenuClick = this._handleMenuClick.bind(this);
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow(e) {
    const { height } = e.endCoordinates;
    this.setState({ keyboardVisible: true });
    this.carousel.animateBookThumb(true, height);
    Animated.timing(this.scrollViewAnim, {
      duration: 500,
      toValue: 1
    }).start();
  }

  _keyboardWillHide() {
    this.carousel.animateBookThumb(false);
    this.setState({ keyboardVisible: false });
    this.clickMenu._showMenu();
    Animated.timing(this.scrollViewAnim, {
      duration: 500,
      toValue: 0
    }).start();
  }

  updateCurrentBook(book) {
    this.setState({ currentBook: book });
  }

  _handleMenuClick(btn) {
    this.noteInput.focusInput(btn);
  }

  render() {
    const { user } = this.props;
    const { lists } = user;
    const books = [];
    lists.forEach((list) => {
      list.books.forEach((book) => {
        if (book.current) {
          books.push(book);
        }
      });
    });
    const noteCards = (this.state.currentBook) ? (
      this.state.currentBook.notes.map((note) => (
        <View key={note.id} style={styles.noteCardWrapper}>
          <TextCard item={note} />
        </View>
      ))
    ) : null;


    return (
      <BackgroundImageFull image={tealWhiteGradient}>
        <Animated.ScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={!this.state.keyboardVisible}
          style={{
            backgroundColor: this.scrollViewAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
            })
          }}
        >
          <View style={styles.carouselContainer}>
            <Carousel
              items={books}
              size="large"
              updateCurrent={(book) => {
                this.updateCurrentBook(book);
              }}
              ref={(e) => { this.carousel = e; }}
            />
          </View>

          <View style={[{
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: globalStyles.paddingSm.y,
            borderRadius: '5px',
          }, globalStyles.boxShadow]}
          >

            <View>
              <NoteInput
                ref={(e) => { this.noteInput = e; }}
                book={this.state.currentBook}
                user={this.props.user}
              />
              <ClickMenu
                onClick={(btn) => { this._handleMenuClick(btn); }}
                ref={(e) => { this.clickMenu = e; }}
              />
            </View>

            <View style={{
              backgroundColor: 'rgba(239, 239, 239, 0.4)',
              paddingTop: globalStyles.paddingSm.y,
              paddingBottom: globalStyles.paddingSm.y
            }}
            >
              {noteCards}
            </View>
          </View>
        </Animated.ScrollView>
      </BackgroundImageFull>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(CurrentReadsScreen);
