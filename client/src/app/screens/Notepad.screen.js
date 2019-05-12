import React from 'react';
import { Animated, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { appColors, appHeights, appStyles, normalizeFont } from '../../assets/styles/appStyles.styles';
import { screenStyles } from '../../assets/styles/notes/noteStyles.styles';
import Note from '../../core/classes/models/Note';
import { AlertsService } from '../../core/services/AlertsService';
import { GlobalService } from '../../core/services/GlobalService';
import { HttpService } from '../../core/services/HttpService';

const httpService = Object.create(HttpService);
const globalService = Object.create(GlobalService);
const alertsService = Object.create(AlertsService);
const mapStateToProps = (state) => ({
  notes: state.notes,
  quotes: state.quotes
});

class NotepadScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={[screenStyles.saveBtn]}
        onPress={navigation.getParam('submitNote')}>
        <Text style={screenStyles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    )
  })

  constructor(props) {
    super(props);
    this.state = {
      type: '',
      noteData: null,
      isUpdate: false,
      keyboardHeight: 0
    };
    this._setScreenData = this._setScreenData.bind(this);
    this._updateContentInput = this._updateContentInput.bind(this);
    this._updatePageInput = this._updatePageInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateNote = this._updateNote.bind(this);
    this._createNote = this._createNote.bind(this);
    this._switchType = this._switchType.bind(this);
    this.screenAnim = new Animated.Value(1);
  }

  componentWillMount() {
    this.props.navigation.setParams({ submitNote: this._handleSubmit });
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
    this._setScreenData();
  }

  componentDidMount() {
    this.notepadInput.focus();
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height })
  }

  _keyboardWillHide() {
    this.setState({ keyboardHeight: 0 })
  }

  _setScreenData() {
    const store = globalService.getStore();
    const incomingNote = this.props.navigation.getParam('note');
    const bookId = this.props.navigation.getParam('bookId');
    const type = this.props.navigation.getParam('type');
    const isUpdate = !!(incomingNote);
    const noteData = (incomingNote) ? { ...incomingNote } : {
      type,
      bookId,
      content: '',
      userId: store.getState().user.id,
      page: null,
    };
    this.setState({ noteData, isUpdate, type });
  }

  _updateContentInput(content) {
    this.setState((prevState) => ({
      noteData: { ...prevState.noteData, content }
    }));
  }

  _updatePageInput(page) {
    this.setState((prevState) => ({
      noteData: { ...prevState.noteData, page: parseInt(page, 10) || '' }
    }));
  }

  _updateNote() {
    const { noteData, type } = this.state;
    const note = this.props.navigation.getParam('note');
    note.update(globalService.getStore(), { id: note.id, newContent: noteData.content });
    alertsService.createAlert(`${type === 'note' ? 'Note' : 'Quote'} Updated`, 'check');
    this.props.navigation.goBack();
  }

  _createNote(note) {
    const { type } = this.state;
    const newNote = new Note(note.id, type, note.content, note.page, note.bookId, note.userId, note.createdAt);
    const alertText = type === 'note' ? 'Note Added' : 'Quote Added';
    newNote.addToStore(globalService.getStore());
    alertsService.createAlert(alertText, 'check');
    this.props.navigation.goBack();
  }

  _handleSubmit() {
    const { noteData, isUpdate } = this.state;
    if (noteData.content) {
      if (isUpdate) {
        httpService.update(`notes/${noteData.id}`, {
          itemData: {
            content: noteData.content,
            page: noteData.page
          }
        }).then((result) => {
          this._updateNote(result);
        }).catch((error) => {
          console.error('ERROR UPDATING NOTE', error);
        });
      } else {
        httpService.create('notes', { noteData }).then((result) => {
          this._createNote(result);
        });
      }
    }
  }

  _switchType() {
    const { type } = this.state;
    this.screenAnim.setValue(0);
    Animated.timing(this.screenAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    this.setState({ type: type === 'note' ? 'quote' : 'note' });
  }

  render() {
    const { noteData, keyboardHeight, type, isUpdate } = this.state;
    const newOrEdit = (isUpdate) ? 'Edit' : 'New';
    const activeText = (type === 'note') ? `${newOrEdit} Note` : `${newOrEdit} Quote`;
    const inactiveText = (type === 'note') ? 'New Quote' : 'New Note';
    const activeIcon = (type === 'note') ? 'lead-pencil' : 'format-quote-open';
    const inactiveIcon = (type === 'note') ? 'format-quote-close' : 'lead-pencil';
    return (
      <View style={[screenStyles.container]}>
        <Animated.View style={[screenStyles.mainInputContainer, {
          opacity: this.screenAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }]}>
          <TextInput
            autoFocus={true}
            enablesReturnKeyAutomatically={true}
            value={noteData.content}
            multiline={true}
            onChangeText={this._updateContentInput}
            placeholder={activeText}
            placeholderTextColor={appColors.transGray}
            returnKeyLabel="Submit"
            ref={el => { this.notepadInput = el; }}
            style={[appStyles.paddingMd, screenStyles.input]}
          />
          <Icon
            style={[screenStyles.activeIcon]}
            name={activeIcon}
            size={normalizeFont(70)}
            color={appColors.gray}
          />
        </Animated.View>

        <View style={[screenStyles.footer, { marginBottom: keyboardHeight - appHeights.ten }]}>
          {!isUpdate && (
            <View style={[screenStyles.inactiveTypeContainer]}>
              <Icon
                style={[screenStyles.inactiveIcon]}
                name={inactiveIcon}
                size={normalizeFont(40)}
                color={appColors.gray}
              />
              <Animated.View style={[{
                opacity: this.screenAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1]
                })
              }]}>
                <TouchableOpacity
                  onPress={this._switchType}
                  style={[screenStyles.inactiveBtn]}>
                  <Icon
                    name="swap-vertical-variant"
                    size={normalizeFont(20)}
                    color={appColors.offWhite}
                  />
                  <Text style={[screenStyles.inactiveText]}>{inactiveText}</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          <View style={[screenStyles.pageRefInputContainer]}>
            <Text style={[screenStyles.pageRefLabel]}>Page Reference:</Text>
            <TextInput
              enablesReturnKeyAutomatically={true}
              value={noteData.page}
              onChangeText={this._updatePageInput}
              clearButtonMode="while-editing"
              returnKeyLabel="Submit"
              keyboardType="number-pad"
              style={[screenStyles.pageRefInput]}
            ></TextInput>
          </View>
        </View>
      </View >
    );
  }
}

export default connect(mapStateToProps)(NotepadScreen);