import React from 'react';
import Moment from 'react-moment';
import {
  View, StyleSheet, TextInput, Text, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {
  appStyles, normalizeFont
} from '../../assets/styles/appStyles';
import TouchButton from '../widgets/TouchButton';
import Environment from '../../environment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    width: appStyles.widthPcts.ninety,
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: appStyles.paddingSm.x,
    paddingRight: appStyles.paddingSm.x,
    paddingBottom: appStyles.paddingSm.y,
    paddingTop: appStyles.paddingSm.y,
    borderRadius: 3,
  },
  inputContainer: {
    backgroundColor: '#fff',
    marginTop: appStyles.paddingSm.y,
    marginBottom: appStyles.paddingSm.y,
    maxHeight: 300,
  },
  input: {
    fontSize: normalizeFont(14),
    fontFamily: 'Merriweather',
    paddingTop: appStyles.paddingMd.y,
    paddingBottom: appStyles.paddingMd.y,
    paddingLeft: appStyles.paddingMd.x,
    paddingRight: appStyles.paddingMd.y,

  },
  cardTop: {
    paddingTop: appStyles.paddingSm.y,
    paddingBottom: appStyles.paddingSm.y,
    paddingLeft: appStyles.paddingSm.x,
    paddingRight: appStyles.paddingSm.y,
  },
  cardBottom: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class TextCardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '',
      initialValue: ''
    };
    this._saveChanges = this._saveChanges.bind(this);
    this._handleDeletePress = this._handleDeletePress.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentValue: this.props.item.content,
      initialValue: this.props.item.content
    });
  }

  _handleChange(currentValue) {
    this.setState({ currentValue });
  }

  _handleDeletePress() {
    const { item, endpoint, eventEmitter } = this.props;
    const { id } = item;
    eventEmitter.emit('deleteButtonPressed', { endpoint, itemId: id, eventType: 'delete note' });
  }

  async handleDelete() {
    console.log('HANDLING DEELEY');
    const { endpoint, item, eventEmitter } = this.props;
    const noteType = (endpoint === 'notes') ? 'note' : 'quote';
    const url = `${Environment.BASE_URL}/${endpoint}/${item.id}`;
    const deleteResults = await axios.delete(url);
    if (!deleteResults.data.error) {
      eventEmitter.emit('noteDeleted', { eventType: `${noteType} deleted` });
    } else {
      console.log('ERROR DELETINGG NOTE', deleteResults.data.error);
      eventEmitter.emit('noteDeleted', { eventType: `${noteType} delete error` });
    }
  }

  async _saveChanges() {
    const { currentValue, initialValue } = this.state;
    if (currentValue !== initialValue) {
      const { endpoint, item, eventEmitter } = this.props;
      const noteType = (endpoint === 'notes') ? 'note' : 'quote';
      const url = `${Environment.BASE_URL}/${endpoint}/${item.id}`;
      console.log('SAVING CHANGES', url);
      const updateNoteResult = await axios.post(url, { newContent: currentValue });
      if (!updateNoteResult.data.error) {
        eventEmitter.emit('noteUpdated', { eventType: `${noteType} updated` });
      } else {
        console.log('ERROR UPDATING NOTE', updateNoteResult.data.error);
        eventEmitter.emit('noteUpdated', { eventType: `${noteType} update error` });
      }
      this.input.blur();
    }
  }

  render() {
    const { createdAt } = this.props.item;
    const { currentValue, initialValue } = this.state;
    return (
      <View style={[styles.container]}>
        <View style={[styles.cardTop]}>
          <Text style={{ fontSize: normalizeFont(12) }}>
            added
            {' '}
            <Moment
              element={Text}
              fromNowDuring={2.628e+9}
              style={{ fontSize: normalizeFont(12) }}
            >
              {createdAt}
            </Moment>
          </Text>
        </View>
        <View style={[appStyles.boxShadow, styles.inputContainer]}>
          <TextInput
            value={currentValue}
            returnKeyType="done"
            multiline={true}
            clearButtonMode="while-editing"
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            selectTextOnFocus={true}
            onChangeText={(value) => { this._handleChange(value); }}
            onFocus={this.showInput}
            onBlur={this.hideInput}
            onSubmitEditing={() => { }}
            style={[styles.input]}
            ref={(e) => { this.input = e; }}
          />
        </View>
        <View style={[styles.cardBottom]}>
          <View style={{}}>
            <TouchButton
              type="flat"
              text="Save Changes"
              isDisabled={currentValue === initialValue}
              onPress={this._saveChanges}
            />
          </View>

          <View style={{ position: 'absolute', right: 5 }}>
            <TouchableOpacity onPress={this.props.onDeletePress}>
              <Icon name="trash" size={normalizeFont(20)} color="#4a4a4a" />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}

export default TextCardEdit;