import React from 'react';
import {
  Animated, Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import { appStyles, normalizeFont, SCREEN_WIDTH } from '../../assets/styles/appStyles';
import TextCard from '../components/TextCard';

const styles = StyleSheet.create({
  noteCardsContainer: {
    paddingTop: appStyles.paddingSm.y,
    paddingBottom: appStyles.paddingLg.y,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: appStyles.paddingMd.y,
    zIndex: 901,
    flex: 1
  },
  noteCardWrapper: {
    paddingTop: appStyles.paddingSm.y,
    paddingBottom: appStyles.paddingSm.y,
    marginBottom: appStyles.paddingSm.y,
    marginTop: appStyles.paddingSm.y,
    marginLeft: appStyles.paddingMd.x,
    marginRight: appStyles.paddingMd.x,
    flex: 1
  },
});

class NoteCardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this._getNoteCards = this._getNoteCards.bind(this);
    this._handleCardPress = this._handleCardPress.bind(this);
    this.notecardAnim = new Animated.Value(0);
  }

  componentDidUpdate() {
    this._triggerAnim();
  }

  _handleCardPress() {
    console.log(this.container.contentOffset);
    this.props.handleCardPress();
  }

  _getNoteCards() {
    const { currentBook } = this.props;
    return (currentBook) ? (
      currentBook.notes.map((note) => (
        <Animated.View
          key={note.id}
          style={[styles.noteCardWrapper, {
            width: this.notecardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [
                (SCREEN_WIDTH * 0.9) - (appStyles.paddingMd.x * 2),
                SCREEN_WIDTH - (appStyles.paddingMd.x * 2)
              ]
            })
          }]}
        >
          <TextCard item={note} handlePress={this._handleCardPress} />
        </Animated.View>
      ))
    ) : null;
  }

  _triggerAnim() {
    if (this.props.showAsFullScreen) {
      Animated.timing(this.notecardAnim, {
        duration: 500,
        toValue: 1
      }).start();
    } else {
      Animated.timing(this.notecardAnim, {
        duration: 500,
        toValue: 0
      }).start();
    }
  }

  render() {
    const { showAsFullScreen } = this.props;
    const noteCards = this._getNoteCards();
    const position = (showAsFullScreen) ? 'absolute' : 'static';
    const showMoreBtn = (!showAsFullScreen) ? (
      <View style={{
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
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
    ) : null;

    return (
      <Animated.ScrollView
        horizontal={showAsFullScreen}
        scrollEnabled={showAsFullScreen}
        pagingEnabled={true}
        ref={(e) => { this.container = e; }}
        style={[
          styles.noteCardsContainer,
          {
            position,
            top: 0,
            backgroundColor: this.notecardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(239, 239, 239, 0.4)', 'rgba(0, 0, 0, 0)']
            }),
            width: this.notecardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['90%', '100%']
            })
          }]}
      >
        {noteCards}
        {showMoreBtn}
      </Animated.ScrollView>
    );
  }
}

export default NoteCardsContainer;