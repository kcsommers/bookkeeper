import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard
} from 'react-native';
import { Header } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { appColors, appStyles, normalizeFont, appHeights } from '../../assets/styles/appStyles.styles';
import { HttpService } from '../../core/services/HttpService';
import { GlobalService } from '../../core/services/GlobalService';
import { AlertsService } from '../../core/services/AlertsService';
import Note from '../../core/classes/models/Note';
import Quote from '../../core/classes/models/Quote';
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
      itemData: null,
      screenData: null,
      noteType: '',
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
    const { itemData, noteType } = this.state;
    const { note } = this.props.navigation.getParam('content');
    note.update(globalService.getStore(), { id: note.id, newContent: itemData.content });
    alertsService.createAlert(`${noteType === 'note' ? 'Note' : 'Quote'} Updated`, 'check');
    this.props.navigation.goBack();
  }

  _createNote(note) {
    const { noteType } = this.state;
    let newNote;
    let alertText;
    if (noteType === 'note') {
      newNote = new Note(
        note.id, note.content, note.bookId, note.userId, note.createdAt
      );
      alertText = 'Note Added';
    } else {
      newNote = new Quote(
        note.id, note.content, note.page, note.bookId, note.userId, note.createdAt
      );
      alertText = 'Quote Added';
    }
    newNote.addToStore(globalService.getStore());
    alertsService.createAlert(alertText, 'check');
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
      <View style={[styles.container]}>
        <TextInput
          autoFocus={true}
          enablesReturnKeyAutomatically={true}
          value={itemData.content}
          multiline={true}
          onChangeText={this._updateInputContent}
          placeholder={screenData.placeholder}
          placeholderTextColor={appColors.transGray}
          returnKeyLabel="Submit"
          ref={el => { this.notepadInput = el; }}
          style={[appStyles.paddingMd, styles.input]}
        />
        <Icon
          style={[styles.backgroundIcon]}
          name={icon}
          size={normalizeFont(70)}
          color={appColors.gray}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(NotepadScreen);