import axios from 'axios';
import React from 'react';
import {
  Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View
} from 'react-native';
import { connect } from 'react-redux';
import tealWhiteGradient from '../../assets/images/page_backgrounds/tealWhiteGradient.png';
import { AppStyling } from '../../assets/styles/appStyles';
import Environment from '../../environment';
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
      currentBook: null
    };
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow() {

  }

  _keyboardWillHide() {
    this.carousel.animateBookThumb(false);
  }


  async _handleAddItem(content, endpoint, bookId) {
    const userId = this.props.user.id;
    const url = `${Environment.BASE_URL}/${endpoint}`;
    const modelData = { content, bookId, userId };
    const addItemResults = await axios.post(url, modelData);
    console.log('ADD ITEM RESULTS', addItemResults.data);
  }

  updateCurrentBook(book) {
    this.setState({ currentBook: book });
  }

  _handleMenuClick(btn) {
    console.log('HANDLING Note INPUT FOCUS', btn);
    this.carousel.animateBookThumb(true);
    this.noteInput.input.focus();
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
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <BackgroundImageFull image={tealWhiteGradient}>
          <ScrollView>
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
              backgroundColor: 'rgba(239, 239, 239, 0.4)',
              width: '90%',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingBottom: globalStyles.paddingSm.y,
              borderRadius: '5px',
            }, globalStyles.boxShadow]}
            >

              <View>
                <ClickMenu onClick={(btn) => { this._handleMenuClick(btn); }} />
                <NoteInput
                  placeholder="New Note"
                  returnKey="Add Note"
                  ref={(e) => { this.noteInput = e; }}
                />
              </View>

              <View style={{
                paddingTop: globalStyles.paddingSm.y,
                paddingBottom: globalStyles.paddingSm.y
              }}
              >
                {noteCards}
              </View>
            </View>
          </ScrollView>
        </BackgroundImageFull>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(CurrentReadsScreen);
