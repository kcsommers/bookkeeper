import React from 'react';
import { Image, Text, View } from 'react-native';
import { appStyles } from '../../../assets/styles/appStyles.styles';
import { componentStyles } from '../../../assets/styles/books/bookStyles.styles';
import NoteCard from '../NoteCard.component';
import QuoteCard from '../QuoteCard.component';
import BookScreenMenu from './BookScreenMenu.component';
import { GlobalService } from '../../../core/services/GlobalService';

const globalService = Object.create(GlobalService);

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedNotes: 'notes'
    };
    this.toggleCurrentRead = this.toggleCurrentRead.bind(this);
    this.changeNoteDisplay = this.changeNoteDisplay.bind(this);
    this._getNotes = this._getNotes.bind(this);
  }

  componentWillMount() {
    this._updateNotes();
  }

  componentDidUpdate() {
    this._updateNotes();
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

  changeNoteDisplay(noteType) {
    this.setState({ displayedNotes: noteType });
  }

  _updateNotes() {
    const { book } = this.props;
    this.notes = this._getNotes('notes', book.noteIds);
    this.quotes = this._getNotes('quotes', book.quoteIds);
  }

  _getNotes(type, ids) {
    const notes = [];
    const notesFromStore = globalService.getStore().getState()[type];
    ids.forEach((id) => { notes.push(notesFromStore[id]); });
    return notes;
  }

  _getTitleSize(title) {
    if (title.length < 25) {
      return appStyles.h1;
    }
    if (title.length < 35) {
      return appStyles.h2;
    }
    return appStyles.h3;
  }

  render() {
    const { displayedNotes } = this.state;
    const { book, navigate } = this.props;
    const notesMapped = (this.notes.length) ? this.notes.map((note) => (
      note ? <NoteCard note={note} key={note.id} /> : null
    )) : <Text style={[appStyles.h5i, appStyles.paddingLg]}>You don&apos;t have any notes yet.</Text>;

    const quotesMapped = (this.quotes.length) ? this.quotes.map((quote) => (
      quote ? <QuoteCard quote={quote} key={quote.id} /> : null
    )) : <Text style={[appStyles.h5i, appStyles.paddingLg]}>You don&apos;t have any quotes yet.</Text>;


    return book ? (
      <View style={[componentStyles.mainContainer]}>
        <View style={[componentStyles.thumbnailContainer]}>
          <Image
            source={{ uri: book.thumbnail, cache: 'force-cache' }}
            style={[componentStyles.thumbnail]}
            resizeMode="cover"
          />
        </View>
        <View style={[componentStyles.infoContainer, appStyles.paddingSm]}>
          <Text style={[this._getTitleSize(book.title), componentStyles.infoText]}>{book.title}</Text>
          <Text style={[appStyles.h3i, componentStyles.infoText]}>{book.authors}</Text>
        </View>
        <BookScreenMenu
          book={book}
          navigate={navigate}
          displayedNotes={displayedNotes}
          changeNoteDisplay={this.changeNoteDisplay}
          toggleCurrent={this.toggleCurrentRead}
        />
        <View style={[componentStyles.notesContainer]}>
          {displayedNotes === 'notes' ? notesMapped : quotesMapped}
        </View>
      </View>
    ) : null;
  }
}
