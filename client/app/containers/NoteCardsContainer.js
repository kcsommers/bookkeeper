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
    marginBottom: appStyles.paddingMd.y,
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 901,
    flex: 1,
    top: 0,
  },
  noteCardOuter: {
    paddingTop: appStyles.paddingSm.y,
    paddingBottom: appStyles.paddingSm.y,
    marginBottom: appStyles.paddingSm.y,
    marginTop: appStyles.paddingSm.y,
    marginLeft: appStyles.paddingMd.x,
    marginRight: appStyles.paddingMd.x,
    flex: 1,
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
      <Animated.ScrollView
        style={[styles.noteCardsContainer, {
          width: this.containerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [appStyles.widthPcts.ninety, appStyles.widthPcts.full]
          }),
          backgroundColor: this.containerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(239, 239, 239, 0.4)', 'rgba(0, 0, 0, 0)']
          })
        }]}
      >
        {noteCards}
        <View style={[styles.showMoreButtonContainer]}>
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
      </Animated.ScrollView>
    );
  }
}

export default NoteCardsContainer;