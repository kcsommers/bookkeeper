import React from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import { ScreenService } from '../../core/services/ScreenService';
import Book from '../components/Book.component';
import BkModal from '../components/BkModal.component';

const screenService = Object.create(ScreenService);
const mapStateToProps = (state) => ({
  books: state.books,
  newItems: state.newItems,
  modalTrigger$: state.events.modalTrigger
});

class BookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null,
      currentBookIndex: 0,
      modalVisible: false,
      currentModalContent: null
    };
    this._changeCurrentBook = this._changeCurrentBook.bind(this);
    this._onNavigation = this._onNavigation.bind(this);
    this._triggerModal = this._triggerModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {
    const { navigation, modalTrigger$ } = this.props;
    modalTrigger$.addListener('trigger-modal', this._triggerModal);
    modalTrigger$.addListener('close-modal', this._closeModal);
    modalTrigger$.addListener('trigger-nav', this.navigate);
    this.navSubscription$ = navigation.addListener('willFocus', this._onNavigation);
  }

  componentWillUnmount() {
    this.navSubscription$.remove();
    this.props.modalTrigger$.removeAllListeners();
  }

  navigate(routeData) {
    if (this.state.modalVisible) {
      this._closeModal();
    }

    const { path, params } = routeData;
    this.props.navigation.navigate(path, params);
  }

  _triggerModal(args) {
    const currentModalContent = screenService.getModalContent(args.template, args.content, args.actions);
    this.setState({
      modalVisible: true,
      currentModalContent
    });
  }

  _closeModal() {
    this.setState({
      modalVisible: false,
      currentModalContent: null
    });
  }

  _onNavigation() {
    const bookId = this.props.navigation.getParam('id');
    const currentBook = this.props.books[bookId];
    this.setState({ currentBook });
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

  render() {
    const { currentBook, modalVisible, currentModalContent } = this.state;
    return (currentBook) ? (
      <View>
        <Book book={currentBook} navigate={this.navigate} />
        {(modalVisible) ? (
          <BkModal isVisible={modalVisible}>
            {currentModalContent && currentModalContent.template}
          </BkModal>
        ) : null}
      </View>
    ) : null;
  }
}

export default connect(mapStateToProps)(BookScreen);