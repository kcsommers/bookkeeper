import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated
} from 'react-native';
import { connect } from 'react-redux';
import NoteCard from './NoteCard.component';
import QuoteCard from './QuoteCard.component';
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
    backgroundColor: appColors.offWhite,
    flex: 1,
    alignItems: 'center',
    paddingTop: appSpacing.md.y,
    paddingBottom: appSpacing.md.y
  },
  notecardsContainer: {
    marginTop: appSpacing.lg.y
  }
});

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 'notes'
    };
    this.menuButtonAnim = new Animated.Value(0);
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
    Animated.timing(this.menuButtonAnim, {
      duration: 300,
      toValue,
      useNativeDriver: true
    }).start();
    this.setState({ displayed: noteType });
  }

  render() {
    const notes = this._getNotes('notes', this.props.noteIds);
    const quotes = this._getNotes('quotes', this.props.quoteIds);
    const { displayed } = this.state;
    const notesMapped = (notes.length) ? notes.map((note) => (
      note ? <NoteCard note={note} key={note.id} /> : null
    )) : <Text style={[appStyles.h5i, appStyles.paddingLg]}>You don&apos;t have any notes yet.</Text>;

    const quotesMapped = (quotes.length) ? quotes.map((quote) => (
      quote ? <QuoteCard quote={quote} key={quote.id} /> : null
    )) : <Text style={[appStyles.h5i, appStyles.paddingLg]}>You don&apos;t have any quotes yet.</Text>;

    const displayedNotes = (displayed === 'notes') ? notesMapped : quotesMapped;
    return (
      <View>
        <View style={[styles.notesContainerMenu]}>
          <TouchableOpacity
            onPress={() => { this._switchNotes('notes'); }}
            style={[styles.notesContainerMenuBtn, {
              transform: [
                {
                  scale: this.menuButtonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.2, 1]
                  })
                }
              ],
              shadowOpacity: this.menuButtonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0]
              }),
              shadowColor: appColors.gray,
              shadowOffset: { width: 1, height: 2 },
              shadowRadius: 2,
              zIndex: (displayed === 'notes') ? 900 : 800
            }]}
          >
            <Text style={[appStyles.label, appStyles.buttonTextDark]}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this._switchNotes('quotes'); }}
            style={[styles.notesContainerMenuBtn, {
              transform: [
                {
                  scale: this.menuButtonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2]
                  })
                }
              ],
              shadowOpacity: this.menuButtonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.2]
              }),
              shadowColor: appColors.gray,
              shadowOffset: { width: -1, height: 2 },
              shadowRadius: 2,
              zIndex: (displayed === 'notes') ? 800 : 900
            }]}
          >
            <Text style={[appStyles.label, appStyles.buttonTextDark]}>Quotes</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.notecardsContainer]}>
          {displayedNotes}
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(NotesContainer);