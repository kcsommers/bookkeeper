import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import offWhiteGradient from '../../assets/images/page_backgrounds/offWhiteGradient.png';
import { styles } from '../../assets/styles/screens/bookScreen.styles';
import BackgroundImage from '../components/BackgroundImage.component';
import Book from '../components/books/Book.component';
import { screenWrapper } from '../wrappers/ScreenWrapper.hoc';

const mapStateToProps = (state) => ({
  books: state.books,
  user: state.user,
  globalModalTrigger$: state.events.globalModalTrigger
});

class BookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null,
    };
    this.onNavigation = this.onNavigation.bind(this);
    this.navigate = this.navigate.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this._getBookFromStore = this._getBookFromStore.bind(this);
  }

  componentWillMount() {
    const { globalModalTrigger$ } = this.props;
    globalModalTrigger$.addListener('trigger-modal', this.triggerModal.bind(this));
    globalModalTrigger$.addListener('close-modal', this.closeModal.bind(this));
    globalModalTrigger$.addListener('trigger-nav', this.navigate);
  }

  componentWillUnmount() {
    this.props.globalModalTrigger$.removeAllListeners();
  }

  onNavigation() {
    this._getBookFromStore();
  }

  navigate(path, params) {
    this.props.navigate(path, params);
  }

  triggerModal(args) {
    this.props.triggerModal(args.template, args.content, args.actions);
  }

  closeModal() {
    this.props.closeModal();
    this._getBookFromStore();
  }

  _getBookFromStore() {
    const bookId = this.props.navigation.getParam('id');
    const currentBook = this.props.books[bookId];
    this.setState({ currentBook });
  }

  render() {
    const { currentBook } = this.state;
    return (currentBook) ? (
      <View style={styles.container}>
        <BackgroundImage image={currentBook.thumbnail} />
        <BackgroundImage image={offWhiteGradient} />
        <Book
          book={currentBook}
          triggerModal={this.triggerModal}
          closeModal={this.closeModal}
          navigate={this.navigate}
        />
      </View>


    ) : null;
  }
}

export default connect(mapStateToProps)(screenWrapper(BookScreen));