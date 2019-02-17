import React from 'react';
import {
  Animated, Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import { appStyles, normalizeFont } from '../../assets/styles/appStyles';
import TextCard from '../components/TextCard';

const styles = StyleSheet.create({
  noteCardsContainer: {
    paddingTop: appStyles.paddingSm.y,
    paddingBottom: appStyles.paddingLg.y,
    paddingLeft: appStyles.paddingMd.x,
    paddingRight: appStyles.paddingMd.x
  },
  noteCardOuter: {
    flex: 1,
    marginTop: appStyles.paddingSm.y,
    marginBottom: appStyles.paddingSm.y
  }
});

class NoteCardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.containerAnim = new Animated.Value(0);
    this._getNoteCards = this._getNoteCards.bind(this);
  }

  _getNoteCards() {
    const { currentBook } = this.props;
    return (currentBook) ? (
      currentBook.notes.map((note) => (
        <Animated.View
          key={note.id}
          style={[styles.noteCardOuter]}
        >
          <TextCard
            item={note}
            onPress={(card) => { this.props.onCardPress(card); }}
          />
        </Animated.View>
      ))
    ) : null;
  }

  render() {
    const noteCards = this._getNoteCards();

    return (
      <Animated.View
        style={[styles.noteCardsContainer, {
          width: appStyles.widthPcts.ninety,
          backgroundColor: 'rgba(239, 239, 239, 0.4)'
        }]}
      >
        {noteCards}
        <View style={[{
          marginTop: appStyles.paddingMd.y
        }]}
        >
          <TouchableOpacity
            onPress={this.showMoreNotes}
            style={[appStyles.buttonOutline, {
              borderColor: '#f7f7f7'
            }]}
          >
            <Text style={{
              fontFamily: 'Merriweather',
              fontSize: normalizeFont(16),
              color: '#f7f7f7'
            }}
            >
              Show More
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

export default NoteCardsContainer;