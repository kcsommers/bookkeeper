import React from 'react';
import { Text, TouchableOpacity, View, Button, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { appColors, appStyles, normalizeFont } from '../../../assets/styles/appStyles.styles';
import { menuStyles } from '../../../assets/styles/books/bookStyles.styles';

export default class BookScreenMenu extends React.Component {
  constructor(props) {
    super(props);
    this.notesDisplayAnim = new Animated.Value(0);
    this._changeNoteDisplay = this._changeNoteDisplay.bind(this);
  }

  _changeNoteDisplay(noteType) {
    const { changeNoteDisplay, displayedNotes } = this.props;
    if (noteType !== displayedNotes) {
      const toValue = (noteType === 'notes') ? 0 : 1;
      Animated.timing(this.notesDisplayAnim, {
        duration: 300,
        toValue,
        useNativeDriver: true
      }).start();
      changeNoteDisplay(noteType);
    }
  }

  render() {
    const { book, navigate, toggleCurrent, displayedNotes } = this.props;
    const currentIcon = (book.current) ? 'bookmark-check' : 'book-open-page-variant';
    return (
      <View style={[menuStyles.menuContainer]}>
        <View style={[menuStyles.mainBtnsContainer]}>
          <TouchableOpacity
            style={[appStyles.boxShadow, menuStyles.addNoteBtn, menuStyles.menuBtn]}
            onPress={() => {
              navigate('Notepad', {
                bookId: book.id,
                type: (displayedNotes === 'notes') ? 'note' : 'quote',
                note: null
              });
            }}
          >
            <Text style={[menuStyles.menuBtnText]}>{(displayedNotes === 'notes') ? 'Add Note' : 'Add Quote'}</Text>
            <Icon
              name={(displayedNotes === 'notes') ? 'lead-pencil' : 'format-quote-close'}
              size={normalizeFont(22)}
              color={appColors.teal}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[appStyles.boxShadow, menuStyles.currentReadBtn, menuStyles.menuBtn]}
            onPress={toggleCurrent}
          >
            <Icon
              name={currentIcon}
              size={normalizeFont(22)}
              color={appColors.teal}
            />
          </TouchableOpacity>
        </View>

        <View style={[menuStyles.moreBtnContainer]}>
          <Button
            style={[menuStyles.moreBtn]}
            title="More..."
            color={appColors.teal}
            onPress={() => { navigate('Notepad'); }}
          />
        </View>

        <View style={[menuStyles.noteControlsContainer]}>
          <TouchableOpacity
            onPress={() => { this._changeNoteDisplay('notes'); }}
            style={[menuStyles.noteControlsBtn, {
              transform: [
                {
                  scale: this.notesDisplayAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.2, 1]
                  })
                }
              ],
              shadowOpacity: this.notesDisplayAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0]
              }),
              shadowColor: appColors.gray,
              shadowOffset: { width: 1, height: 2 },
              shadowRadius: 2,
              zIndex: (displayedNotes === 'notes') ? 900 : 800
            }]}
          >
            <Text style={[appStyles.label, appStyles.buttonTextDark]}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this._changeNoteDisplay('quotes'); }}
            style={[menuStyles.noteControlsBtn, {
              transform: [
                {
                  scale: this.notesDisplayAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2]
                  })
                }
              ],
              shadowOpacity: this.notesDisplayAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.2]
              }),
              shadowColor: appColors.gray,
              shadowOffset: { width: -1, height: 2 },
              shadowRadius: 2,
              zIndex: (displayedNotes === 'notes') ? 800 : 900
            }]}
          >
            <Text style={[appStyles.label, appStyles.buttonTextDark]}>Quotes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}