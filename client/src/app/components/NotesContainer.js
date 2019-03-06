import React from 'react';
import {
  View, Text
} from 'react-native';
import Note from '../../core/classes/models/Note';
import Quote from '../../core/classes/models/Quote';
import NoteDisplay from './NoteDisplay';
import QuoteDisplay from './QuoteDisplay';

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      quotes: []
    };
  }

  componentWillMount() {
    const { notes, quotes } = this.props;
    const notesArr = [];
    const quotesArr = [];
    if (notes) {
      notes.forEach((note) => {
        const newNote = new Note(note.content, note.bookId, note.userId, note.id);
        notesArr.push(newNote);
      });
    }
    if (quotes) {
      quotes.forEach((quote) => {
        const newQuote = new Quote(quote.content, quote.page, quote.bookId, quote.userId, quote.id);
        quotesArr.push(newQuote);
      });
    }
    this.setState({
      notes: notesArr,
      quotes: quotesArr
    });
  }

  render() {
    const { notes, quotes } = this.state;
    const notesMapped = (notes.length) ? notes.map((note) => (
      <NoteDisplay note={note} key={note.id} />
    )) : <Text>NO NOTES</Text>;

    const quotesMapped = (quotes.length) ? quotes.map((quote) => (
      <QuoteDisplay quote={quote} key={quote.id} />
    )) : <Text>NO QUOTES</Text>;
    return (
      <View>
        {notesMapped}
      </View>
    );
  }
}

export default NotesContainer;