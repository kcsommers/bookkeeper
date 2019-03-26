import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated
} from 'react-native';
import { connect } from 'react-redux';
import NoteDisplay from './NoteDisplay.component';
import QuoteDisplay from './QuoteDisplay.component';
import { appStyles, appSpacing, appColors } from '../../assets/styles/appStyles.styles';

const mapStateToProps = (state) => ({
  notes: state.notes,
  quotes: state.quotes
});

const styles = StyleSheet.create({
  notesContainerMenu: {
    flexDirection: 'row'
  },
  notesContainerMenuBtn: {
    backgroundColor: appColors.blue,
    flex: 1,
    alignItems: 'center',
    paddingTop: appSpacing.md.y,
    paddingBottom: appSpacing.md.y
  }
});

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 'notes'
    };
    this.notesMenuAnim = new Animated.Value(0);
    this._switchNotes = this._switchNotes.bind(this);
  }

  // componentWillMount() {
  //   this._setNotes();
  // }

  // componentDidUpdate(prevProps) {
  //   const { noteIds, quoteIds } = this.props;
  //   if (prevProps.noteIds !== noteIds || prevProps.quoteIds !== quoteIds) {
  //     this._setNotes();
  //   }
  // }

  // _setNotes() {
  //   const { noteIds, quoteIds } = this.props;
  //   this.notes = this._getNotes('notes', noteIds);
  //   this.quotes = this._getNotes('quotes', quoteIds);
  //   this.setState({ notes, quotes });
  // }

  _getNotes(type, ids) {
    const notes = [];
    const notesFromStore = this.props[type];
    ids.forEach((id) => { notes.push(notesFromStore[id]); });
    return notes;
  }

  _switchNotes(noteType) {
    const toValue = (noteType === 'notes') ? 0 : 1;
    Animated.timing(this.notesMenuAnim, {
      duration: 300,
      toValue
    }).start();
    this.setState({ displayed: noteType });
  }

  render() {
    const notes = this._getNotes('notes', this.props.noteIds);
    const quotes = this._getNotes('quotes', this.props.quoteIds);
    const { displayed } = this.state;
    const notesMapped = (notes.length) ? notes.map((note) => (
      <NoteDisplay note={note} key={note.id} />
    )) : <Text>NO NOTES</Text>;

    const quotesMapped = (quotes.length) ? quotes.map((quote) => (
      <QuoteDisplay quote={quote} key={quote.id} />
    )) : <Text>NO QUOTES</Text>;

    const displayedNotes = (displayed === 'notes') ? notesMapped : quotesMapped;
    return (
      <View>
        <View style={[styles.notesContainerMenu]}>
          <TouchableOpacity
            onPress={() => { this._switchNotes('notes'); }}
            style={[styles.notesContainerMenuBtn]}
          >
            <Text style={[appStyles.label, appStyles.buttonText]}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this._switchNotes('quotes'); }}
            style={[styles.notesContainerMenuBtn]}
          >
            <Text style={[appStyles.label, appStyles.buttonText]}>Quotes</Text>
          </TouchableOpacity>
        </View>
        {displayedNotes}
      </View>
    );
  }
}

export default connect(mapStateToProps)(NotesContainer);