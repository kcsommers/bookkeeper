import React from 'react';
import axios from 'axios';
import {
  StyleSheet, TextInput, Animated, TouchableOpacity, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Environment from '../../environment';
import { AppStyling, SCREEN_HEIGHT } from '../../assets/styles/appStyles';

const AppStyles = new AppStyling();
const globalStyles = AppStyles.getAppStyles();
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 3,
    position: 'relative',
    justifyContent: 'space-between'
  },
  input: {
    backgroundColor: '#fff',
    color: '#444',
    borderRadius: 3,
    height: '100%',
    fontSize: AppStyles.normalizeFont(16)
  }
});

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: '',
      value: ''
    };
    this.inputAnim = new Animated.Value(0);
    this.showInput = this.showInput.bind(this);
    this.hideInput = this.hideInput.bind(this);
    this.getInputInfo = this.getInputInfo.bind(this);
  }

  getInputInfo() {
    return (
      (this.state.inputType === 'newNote')
        ? {
          placeholder: 'New Note', iconName: 'pencil', buttonText: 'Add Note', endpoint: 'notes'
        }
        : {
          placeholder: 'New Quote', iconName: 'quote', buttonText: 'Add Quote', endpoint: 'quotes'
        }
    );
  }

  focusInput(inputType) {
    this.setState({ inputType });
    this.input.focus();
  }

  showInput() {
    Animated.timing(this.inputAnim, {
      duration: 250,
      toValue: 1
    }).start();
  }

  hideInput() {
    Animated.timing(this.inputAnim, {
      duration: 250,
      toValue: 0
    }).start();
  }

  _handleChange(value) {
    this.setState({ value });
  }

  async _addNote(endpoint) {
    if (this.state.value) {
      const bookId = this.props.book.id;
      const content = this.state.value;
      const userId = this.props.user.id;
      const url = `${Environment.BASE_URL}/${endpoint}`;
      const modelData = { content, bookId, userId };
      const addNoteResults = await axios.post(url, modelData);
      if (!addNoteResults.data.error) {
        console.log('ADD NOTE RESULTS', addNoteResults.data);
        this.input.blur();
      } else {
        console.log('ERROR CREATING NOTE', addNoteResults.data.error);
      }
    } else {
      console.log('NO NOTE VALUE');
    }
  }

  render() {
    const {
      placeholder, iconName, buttonText, endpoint
    } = this.getInputInfo();

    return (
      <Animated.View style={[styles.container, globalStyles.boxShadow, {
        height: this.inputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, SCREEN_HEIGHT * 0.3]
        }),
        marginTop: this.inputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(SCREEN_HEIGHT * 0.55)]
        }),
        opacity: this.inputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })
      }]}
      >
        <Animated.View style={[{
          paddingTop: this.inputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, globalStyles.paddingMd.y]
          }),
          paddingBottom: this.inputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, globalStyles.paddingMd.y]
          }),
          paddingLeft: this.inputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, globalStyles.paddingMd.x]
          }),
          paddingRight: this.inputAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, globalStyles.paddingMd.x]
          }),
        }]}
        >
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#444"
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

          <Icon
            name={iconName}
            size={60}
            color="#444"
            style={{
              opacity: 0.5,
              position: 'absolute',
              top: 0
            }}
          />
        </Animated.View>
        <TouchableOpacity
          onPress={() => { this._addNote(endpoint); }}
          style={[globalStyles.boxShadow, {
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingTop: globalStyles.paddingMd.y,
            paddingBottom: globalStyles.paddingMd.y,
            borderRadius: 3
          }]}
        >
          <Text style={{
            fontFamily: 'Merriweather',
            fontSize: AppStyles.normalizeFont(16),
            color: '#444'
          }}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default NoteInput;