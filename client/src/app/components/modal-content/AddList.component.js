import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Keyboard
} from 'react-native';
import { appColors, appStyles } from '../../../assets/styles/appStyles.styles';
import { styles } from '../../../assets/styles/modalStyles.styles';
import { GlobalService } from '../../../core/services/GlobalService';
import { HttpService } from '../../../core/services/HttpService';
import List from '../../../core/classes/models/List';

const globalService = Object.create(GlobalService);
const httpService = Object.create(HttpService);

export default class AddListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputContent: '',
      keyboardHeight: 0
    };
    this._inputChange = this._inputChange.bind(this);
    this._createList = this._createList.bind(this);
  }

  componentWillMount() {
    this.showKeyboardListener = Keyboard.addListener('keyboardWillShow', this.onShowKeyboard.bind(this));
    this.hideKeyboardListener = Keyboard.addListener('keyboardWillHide', this.onHideKeyboard.bind(this));
  }

  componentDidMount() {
    this.input.focus();
  }

  componentWillUnmount() {
    this.showKeyboardListener.remove();
    this.hideKeyboardListener.remove();
  }

  onShowKeyboard(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  }

  onHideKeyboard() {
    this.setState({ keyboardHeight: 0 });
  }

  _inputChange(value) {
    this.setState({ inputContent: value });
  }

  _createList() {
    const { inputContent } = this.state;
    const itemData = {
      name: inputContent,
      userId: globalService.getStore().getState().user.id
    };
    if (inputContent) {
      httpService.create('lists', { itemData }).then(createdList => {
        const newList = new List(createdList.id, createdList.name, createdList.userId, []);
        this.props.actions.onCreateList(newList);
      }).catch(error => {
        console.error('ERROR CREATING LIST', error);
      });
    }
  }

  render() {
    const { keyboardHeight } = this.state;
    return (
      <View style={[styles.contentWrapper, appStyles.paddingMd, {
        marginBottom: keyboardHeight || 0
      }]}
      >
        <Text style={[appStyles.h5]}>Add List</Text>
        <TextInput
          style={[styles.modalInput, appStyles.boxShadow]}
          placeholder="List Name"
          placeholderTextColor={appColors.gray}
          returnKeyLabel="Submit"
          clearButtonMode="while-editing"
          blurOnSubmit={true}
          enablesReturnKeyAutomatically={true}
          selectTextOnFocus={true}
          onChangeText={this._inputChange}
          ref={e => { this.input = e; }}
        />
        <TouchableOpacity
          style={[styles.addBtn]}
          onPress={this._createList}
        >
          <Text style={[appStyles.buttonText]}>Add List</Text>
        </TouchableOpacity>
      </View>
    );
  }
}