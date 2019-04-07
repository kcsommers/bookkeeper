import React from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import Book from '../components/Book.component';
import { bookScreenStyles } from '../../assets/styles/screens/bookScreen.styles';
import { screenWrapper } from './ScreenWrapper.hoc';

const mapStateToProps = (state) => ({
  books: state.books,
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
  }

  componentWillMount() {
    const { globalModalTrigger$ } = this.props;
    globalModalTrigger$.addListener('trigger-modal', this._triggerModal.bind(this));
    globalModalTrigger$.addListener('close-modal', this._closeModal.bind(this));
    globalModalTrigger$.addListener('trigger-nav', this.navigate);
  }

  componentWillUnmount() {
    this.props.globalModalTrigger$.removeAllListeners();
  }

  onNavigation() {
    const bookId = this.props.navigation.getParam('id');
    const currentBook = this.props.books[bookId];
    this.setState({ currentBook });
  }

  navigate(path, params) {
    this.props.navigate(path, params);
  }

  _triggerModal(args) {
    this.props.triggerModal(args.template, args.content, args.actions);
  }

  _closeModal() {
    this.props.closeModal();
  }

  render() {
    const { currentBook } = this.state;
    return (currentBook) ? (
      <View style={[bookScreenStyles.container]}>
        <Book book={currentBook} navigate={this.navigate} />
      </View>
    ) : null;
  }
}

export default connect(mapStateToProps)(screenWrapper(BookScreen));