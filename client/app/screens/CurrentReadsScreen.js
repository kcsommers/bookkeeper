import React from 'react';
import {
  Animated, Keyboard, StyleSheet, View
} from 'react-native';
import { EventEmitter } from 'events';
import { connect } from 'react-redux';
import tealWhiteGradient from '../../assets/images/page_backgrounds/tealWhiteGradient.png';
import { appStyles } from '../../assets/styles/appStyles';
import Carousel from '../components/Carousel';
import ClickMenu from '../components/ClickMenu';
import NoteInput from '../components/NoteInput';
import Alert from '../components/Alert';
import NoteCardsContainer from '../containers/NoteCardsContainer';
import BackgroundImageFull from '../widgets/BackgroundImageFull';
import Overlay from '../widgets/Overlay';

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
      alertContent: null,
      overlayVisible: false,
      overlayContent: null
    };
    this.screenAnim = new Animated.Value(0);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this._handleMenuClick = this._handleMenuClick.bind(this);
    this._removeAlert = this._removeAlert.bind(this);
    this._getAlertContent = this._getAlertContent.bind(this);
    this._handleCardPress = this._handleCardPress.bind(this);
    this._hideOverlay = this._hideOverlay.bind(this);
    this._showAlert = this._showAlert.bind(this);
    this.eventEmitter = new EventEmitter();
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);

    this.eventEmitter.addListener('noteAdded', this._showAlert);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
    this.eventEmitter.removeAllListeners();
  }

  _keyboardWillShow(e) {
    const { height } = e.endCoordinates;
    this.setState({ keyboardVisible: true });
    this.carousel.animateBookThumb(true, height);
    if (this.scrollView) {
      this.scrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
    }
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
    this.noteInput.focusInput(btn);
  }

  _removeAlert() {
    this.setState({ showAlert: false });
  }

  _showAlert(type) {
    const alertContent = this._getAlertContent(type);
    this.setState({ showAlert: true, alertContent });
  }

  _hideOverlay(eventType) {
    if (eventType) {
      this._showAlert(eventType);
    }

    this.setState({
      overlayVisible: false,
      overlayContent: null
    });
  }

  _handleCardPress(cardData) {
    this.setState({
      overlayVisible: true,
      overlayContent: {
        endpoint: 'notes',
        data: cardData
      }
    });
  }

  _getAlertContent(type) {
    switch (type.eventType) {
      case 'note added':
        return { message: 'Note Added', icon: 'check' };
      case 'note add error':
        return { message: 'Error Adding Note', icon: 'bug' };
      case 'quote added':
        return { message: 'Quote Added', icon: 'check' };
      case 'quote add error':
        return { message: 'Error Adding Quote', icon: 'bug' };
      case 'note updated':
        return { message: 'Note Updated', icon: 'check' };
      case 'note update error':
        return { message: 'Error Updating Note', icon: 'bug' };
      case 'note deleted':
        return { message: 'Note Deleted', icon: 'check' };
      case 'note delete error':
        return { message: 'Error Deleting Note', icon: 'bug' };
      case 'quote deleted':
        return { message: 'Qote Deleted', icon: 'check' };
      case 'quote delete error':
        return { message: 'Error Deleting Quote', icon: 'bug' };
      case 'quote updated':
        return { message: 'Quote Updated', icon: 'check' };
      case 'quote update error':
        return { message: 'Error Updating Qote', icon: 'bug' };
      default:
        return { message: 'What the hell did you just do?', icon: 'bug' };
    }
  }

  render() {
    const { user } = this.props;
    const { lists } = user;
    const books = [];
    const overlay = (this.state.overlayVisible)
      ? (
        <Overlay
          content={this.state.overlayContent}
          onFadeFinish={this._hideOverlay}
          eventEmitter={this.eventEmitter}
        />
      ) : null;

    const alert = (this.state.showAlert)
      ? (
        <Alert
          onFinish={this._removeAlert}
          content={this.state.alertContent}
        />
      ) : null;

    lists.forEach((list) => {
      list.books.forEach((book) => {
        if (book.current) {
          books.push(book);
        }
      });
    });

    return (
      <BackgroundImageFull image={tealWhiteGradient}>
        <Animated.ScrollView
          contentContainerStyle={{
            paddingTop: 50 + this.props.deviceInfo.statusBarHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
              eventEmitter={this.eventEmitter}
              onSubmit={(results) => this._handleAddNote(results)}
            />
            <ClickMenu
              onClick={(btn) => { this._handleMenuClick(btn); }}
              ref={(e) => { this.clickMenu = e; }}
            />
          </View>
          <NoteCardsContainer
            currentBook={this.state.currentBook}
            onCardPress={this._handleCardPress}
          />
        </Animated.ScrollView>
        {alert}
        {overlay}
      </BackgroundImageFull>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user, deviceInfo: state.deviceInfo });

export default connect(mapStateToProps)(CurrentReadsScreen);
