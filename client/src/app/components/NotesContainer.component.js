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
      note ? <NoteDisplay note={note} key={note.id} /> : null
    )) : <Text style={[appStyles.h5i, appStyles.paddingLg]}>You don&apos;t have any notes yet.</Text>;

    const quotesMapped = (quotes.length) ? quotes.map((quote) => (
      quote ? <QuoteDisplay quote={quote} key={quote.id} /> : null
    )) : <Text style={[appStyles.h5i, appStyles.paddingLg]}>You don&apos;t have any quotes yet.</Text>;

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