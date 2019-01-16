import React from 'react';
import {
  Animated, Keyboard, StyleSheet, View
} from 'react-native';
import { connect } from 'react-redux';
import tealWhiteGradient from '../../assets/images/page_backgrounds/tealWhiteGradient.png';
import { appStyles } from '../../assets/styles/appStyles';
import Carousel from '../components/Carousel';
import ClickMenu from '../components/ClickMenu';
import NoteInput from '../components/NoteInput';
import TextCard from '../components/TextCard';
import Alert from '../components/Alert';
import BackgroundImageFull from '../widgets/BackgroundImageFull';

const styles = StyleSheet.create({
  carouselContainer: {
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  menuContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  noteCardsContainer: {
    backgroundColor: 'rgba(239, 239, 239, 0.4)',
    paddingTop: appStyles.paddingSm.y,
    paddingBottom: appStyles.paddingSm.y,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: appStyles.paddingMd.y
  },
  noteCardWrapper: {
    paddingTop: appStyles.paddingSm.y,
    paddingBottom: appStyles.paddingSm.y,
    marginBottom: appStyles.paddingSm.y,
    marginTop: appStyles.paddingSm.y,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%'
  },
  menuBtn: {
    alignItems: 'center',
    paddingTop: appStyles.paddingMd.y,
    paddingBottom: appStyles.paddingMd.y,
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
      clickedMenuBtn: '',
      keyboardVisible: false,
      showAlert: false,
      alertContent: null
    };
    this.screenAnim = new Animated.Value(0);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this._handleMenuClick = this._handleMenuClick.bind(this);
    this._handleAddNote = this._handleAddNote.bind(this);
    this._removeAlert = this._removeAlert.bind(this);
    this._getAlertContent = this._getAlertContent.bind(this);
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
    Animated.timing(this.screenAnim, {
      duration: 500,
      toValue: 1
    }).start();
  }

  _keyboardWillHide() {
    this.carousel.animateBookThumb(false);
    this.setState({ keyboardVisible: false });
    this.clickMenu._showMenu();
    Animated.timing(this.screenAnim, {
      duration: 500,
      toValue: 0
    }).start();
  }

  updateCurrentBook(book) {
    this.setState({ currentBook: book });
  }

  _handleMenuClick(btn) {
    this.setState({ clickedMenuBtn: btn });
    if (this.scrollView) {
      this.scrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
    }
    this.noteInput.focusInput(btn);
  }

  _removeAlert() {
    this.setState({ showAlert: false });
  }

  _getAlertContent() {
    const { clickedMenuBtn } = this.state;
    if (clickedMenuBtn === 'New Note') {
      return { message: 'Note Added', icon: 'check' };
    } if (clickedMenuBtn === 'New Quote') {
      return { message: 'Quote Added', icon: 'check' };
    }
    return { message: 'What the hell did you just add?', icon: 'bug' };
  }

  _handleAddNote(results) {
    if (results.data) {
      const alertContent = this._getAlertContent();
      this.setState({ showAlert: true, alertContent });
    }
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

    const alert = (this.state.showAlert)
      ? <Alert onFinish={this._removeAlert} content={this.state.alertContent} /> : null;

    return (
      <BackgroundImageFull image={tealWhiteGradient}>
        <Animated.ScrollView
          ref={(e) => { this.scrollView = e; }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={!this.state.keyboardVisible}
          style={{
            backgroundColor: this.screenAnim.interpolate({
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

          <View style={styles.menuContainer}>
            <NoteInput
              ref={(e) => { this.noteInput = e; }}
              book={this.state.currentBook}
              user={this.props.user}
              type={this.state.clickedMenuBtn}
              onSubmit={(results) => this._handleAddNote(results)}
            />
            <ClickMenu
              onClick={(btn) => { this._handleMenuClick(btn); }}
              ref={(e) => { this.clickMenu = e; }}
            />
          </View>

          <Animated.View style={[styles.noteCardsContainer, {
            opacity: this.screenAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
          }]}
          >
            {noteCards}
          </Animated.View>
        </Animated.ScrollView>
        {alert}
      </BackgroundImageFull>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(CurrentReadsScreen);
