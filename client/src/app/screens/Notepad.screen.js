import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { appColors, appStyles, normalizeFont, appHeights } from '../../assets/styles/appStyles.styles';
import { HttpService } from '../../core/services/HttpService';
import { GlobalService } from '../../core/services/GlobalService';
import { AlertsService } from '../../core/services/AlertsService';
import Note from '../../core/classes/models/Note';
import { styles } from '../../assets/styles/screens/notepadScreen.styles';

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
        style={[styles.saveBtn]}
        onPress={navigation.getParam('submitNote')}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity >
    )
  })

  constructor(props) {
    super(props);
    this.state = {
      type: 'note',
      noteData: null,
      placeholder: '',
      isUpdate: false,
    };
    this._setScreenData = this._setScreenData.bind(this);
    this._updateInputContent = this._updateInputContent.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateNote = this._updateNote.bind(this);
    this._createNote = this._createNote.bind(this);

  }

  componentWillMount() {
    this.props.navigation.setParams({ submitNote: this._handleSubmit });
    this._setScreenData();
  }

  componentDidMount() {
    this.notepadInput.focus();
  }

  _setScreenData() {
    const store = globalService.getStore();
    const content = this.props.navigation.getParam('content');
    const bookId = this.props.navigation.getParam('bookId');
    const isUpdate = !!(content);
    const noteData = {
      type: 'note',
      content: (content) ? content.note.content : '',
      userId: store.getState().user.id,
      page: null,
      bookId
    };
    const placeholder = (isUpdate) ? 'Edit Note' : 'New Note';
    this.setState({ noteData, placeholder, isUpdate });
  }

  _updateInputContent(content) {
    this.setState((prevState) => ({
      noteData: { ...prevState.noteData, content }
    }));
  }

  _updateNote() {
    const { noteData, type } = this.state;
    const { note } = this.props.navigation.getParam('content');
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
        httpService.update(`notes/${content.note.id}`, { noteData }).then((result) => {
          this._updateNote(result);
        }).catch((error) => {
          console.error('ERROR UPDATING NOTE', error);
        });
      } else {
        console.log('NOTEDATA:::: ', noteData)
        httpService.create('notes', { noteData }).then((result) => {
          this._createNote(result);
        });
      }
    }
  }

  render() {
    const { placeholder, noteData } = this.state;
    return (
      <View style={[styles.container]}>
        <TextInput
          autoFocus={true}
          enablesReturnKeyAutomatically={true}
          value={noteData.content}
          multiline={true}
          onChangeText={this._updateInputContent}
          placeholder={placeholder}
          placeholderTextColor={appColors.transGray}
          returnKeyLabel="Submit"
          ref={el => { this.notepadInput = el; }}
          style={[appStyles.paddingMd, styles.input]}
        />
        <Icon
          style={[styles.backgroundIcon]}
          name="pencil"
          size={normalizeFont(70)}
          color={appColors.gray}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(NotepadScreen);