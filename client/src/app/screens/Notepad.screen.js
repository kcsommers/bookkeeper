import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { appColors, appStyles, normalizeFont } from '../../assets/styles/appStyles.styles';
import { HttpService } from '../../core/services/HttpService';
import { ScreenService } from '../../core/services/ScreenService';
import { AlertsService } from '../../core/services/AlertsService';
import Note from '../../core/classes/models/Note';
import Quote from '../../core/classes/models/Quote';

const httpService = Object.create(HttpService);
const screenService = Object.create(ScreenService);
const alertsService = Object.create(AlertsService);
const mapStateToProps = (state) => ({
  notes: state.notes,
  quotes: state.quotes
});

class NotepadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: null,
      screenData: null,
      noteType: '',
      isUpdate: false
    };
    this._setScreenData = this._setScreenData.bind(this);
    this._updateInputContent = this._updateInputContent.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateNote = this._updateNote.bind(this);
    this._createNote = this._createNote.bind(this);
  }

  componentWillMount() {
    this._setScreenData();
  }

  componentDidMount() {
    setTimeout(() => {
      this.notepadInput.focus();
    }, 500);
  }

  _setScreenData() {
    const store = screenService.getStore();
    const content = this.props.navigation.getParam('content');
    const isUpdate = !!(content);
    const bookId = this.props.navigation.getParam('bookId');
    const noteType = this.props.navigation.getParam('noteType');
    const screenData = {};
    const itemData = {
      userId: store.getState().user.id,
      bookId,
      content: (content) ? content.note.content : ''
    };

    if (noteType === 'note') {
      screenData.endpoint = (isUpdate) ? `notes/${content.note.id}` : 'notes';
      screenData.placeholder = (isUpdate) ? 'Edit Note' : 'New Note';
      screenData.buttonText = 'Save Note';
    } else if (noteType === 'quote') {
      screenData.endpoint = (isUpdate) ? `quotes/${content.quote.id}` : 'quotes';
      screenData.placeholder = (isUpdate) ? 'Edit Quote' : 'New Quote';
      screenData.buttonText = 'Save Quote';
      itemData.page = 0;
    }
    this.setState({
      itemData, screenData, noteType, isUpdate
    });
  }

  _updateInputContent(content) {
    this.setState((prevState) => ({
      itemData: { ...prevState.itemData, content }
    }));
  }

  _updateNote() {
    const { note } = this.props.navigation.getParam('content');
    note.update(screenService.getStore(), { id: note.id, newContent: this.state.itemData.content });
    this.props.navigation.goBack();
  }

  _createNote(note) {
    const { noteType } = this.state;
    let newNote;
    if (noteType === 'note') {
      newNote = new Note(note.id, note.content, note.bookId, note.userId, note.createdAt);
    } else {
      newNote = new Quote(note.id, note.content, note.page, note.bookId, note.userId, note.createdAt);
    }
    newNote.addToStore(screenService.getStore());
    alertsService.createAlert('Note Added', 'check');
    this.props.navigation.goBack();
  }

  _handleSubmit() {
    const { itemData, screenData, isUpdate } = this.state;
    if (itemData.content) {
      if (isUpdate) {
        httpService.update(screenData.endpoint, { itemData }).then((result) => {
          this._updateNote(result);
        }).catch((error) => {
          console.error('ERROR UPDATING NOTE', error);
        });
      } else {
        httpService.create(screenData.endpoint, { itemData }).then((result) => {
          this._createNote(result);
        });
      }
    }
  }

  render() {
    const icon = this.props.navigation.getParam('icon');
    const { screenData, itemData } = this.state;
    return (
      <View style={[appStyles.paddingMd, {
        backgroundColor: appColors.offWhite,
        flex: 1,
        position: 'relative',
      }]}
      >
        <TextInput
          autoFocus={true}
          enablesReturnKeyAutomatically={true}
          value={itemData.content}
          multiline={true}
          onChangeText={this._updateInputContent}
          placeholder={screenData.placeholder}
          placeholderTextColor={appColors.gray}
          returnKeyLabel="Submit"
          ref={el => { this.notepadInput = el; }}
          style={[appStyles.p, {

          }]}
        />
        <View style={[appStyles.paddingSm, {
          opacity: 0.2,
          position: 'absolute'
        }]}
        >
          <Icon
            name={icon}
            size={normalizeFont(70)}
            color={appColors.gray}
          />
        </View>
        <TouchableOpacity
          onPress={this._handleSubmit}
          style={[appStyles.paddingMd, appStyles.noteText, {
            backgroundColor: appColors.aqua,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3
          }]}
        >
          <Text
            style={[appStyles.buttonText]}
          >
            {screenData.buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(mapStateToProps)(NotepadScreen);