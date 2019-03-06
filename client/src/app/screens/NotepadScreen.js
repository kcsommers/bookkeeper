import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { appColors, appStyles, normalizeFont } from '../../assets/styles/appStyles';
import HttpService from '../../core/services/HttpService';

const http = new HttpService();
const mapStateToProps = (state) => ({ user: state.user });

class NotepadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: null,
      screenData: null
    };
    this._setScreenData = this._setScreenData.bind(this);
    this._updateContent = this._updateContent.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillMount() {
    this._setScreenData();
  }

  _setScreenData() {
    const { user, navigation } = this.props;
    const bookId = navigation.getParam('bookId');
    const noteType = navigation.getParam('noteType');
    const screenData = {
      endpoint: '',
      placeholder: '',
      buttonText: ''
    };
    const itemData = {
      content: '',
      userId: user.id,
      bookId
    };
    if (noteType === 'note') {
      screenData.endpoint = 'notes';
      screenData.placeholder = 'New Note';
      screenData.buttonText = 'Add Note';
    } else if (noteType === 'quote') {
      screenData.endpoint = 'quotes';
      screenData.placeholder = 'New Quote';
      screenData.buttonText = 'Add Quote';
      itemData.page = 0;
    }

    this.setState({ itemData, screenData });
  }

  _updateContent(content) {
    this.setState((prevState) => ({
      itemData: { ...prevState.itemData, content }
    }));
  }

  _handleSubmit() {
    const { itemData, screenData } = this.state;
    if (itemData.content) {
      http.create(screenData.endpoint, { itemData }).then((result) => {
        console.log('ADD NOTE RESLT', result);
      }).catch((error) => {
        console.error('ERROR CREATING NOTE', error);
      });
    }
  }

  render() {
    const icon = this.props.navigation.getParam('icon');
    const { screenData } = this.state;
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
          multiline={true}
          onChangeText={this._updateContent}
          placeholder={screenData.placeholder}
          placeholderTextColor={appColors.gray}
          returnKeyLabel="Submit"
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
          style={[appStyles.paddingMd, {
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