import React from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { HttpService } from '../../core/services/HttpService';
import { ScreenService } from '../../core/services/ScreenService';
import { AlertsService } from '../../core/services/AlertsService';
import { styles } from '../../assets/styles/screens/editProfile.styles';
import { appStyles, normalizeFont, appColors } from '../../assets/styles/appStyles.styles';

const httpService = Object.create(HttpService);
const screenService = Object.create(ScreenService);
const alertsService = Object.create(AlertsService);
const mapStateToProps = (state) => ({ user: state.user });

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      inputs: {
        username: this.props.user.username,
        location: this.props.user.location,
        image: this.props.user.image,
        banner: this.props.user.banner
      }
    };
    this._handleChange = this._handleChange.bind(this);
    this._validateForm = this._validateForm.bind(this);
    this._updateProfile = this._updateProfile.bind(this);
  }

  _handleChange(value, field) {
    const { inputs } = this.state;
    const newInputs = {
      ...inputs,
      [field]: value
    };
    this._validateForm(newInputs);
  }

  _validateForm(inputs) {
    const { user } = this.props;
    const fields = Object.keys(inputs);
    let formValid = false;
    for (let i = 0; i < fields.length; i++) {
      if (inputs[fields[i]] && inputs[fields[i]] !== user[fields[i]]) {
        formValid = true;
      }
    }
    this.setState({ inputs, formValid });
  }

  _updateProfile() {
    const { inputs } = this.state;
    const { user } = this.props;
    const itemData = {};
    Object.keys(inputs).forEach(field => {
      if (inputs[field] !== user[field]) {
        itemData[field] = inputs[field];
      }
    });
    httpService.update(`users/update/${user.id}`, { itemData }).then(success => {
      if (success) {
        user.update(screenService.getStore(), itemData);
        alertsService.createAlert('Profile Updated', 'check');
        this.props.navigation.navigate('Profile');
      }
    }).catch(error => {
      console.error('ERROR UPDATING USER', error);
    });
  }

  render() {
    const { formValid, inputs } = this.state;
    const { image, username, location, banner } = inputs;
    return (
      <View style={[styles.container]}>
        <Text style={[appStyles.h2]}>Edit Profile</Text>
        <View style={[styles.formItem]}>
          <Text style={[appStyles.label]}>Username</Text>
          <TextInput
            value={username}
            placeholder="Username"
            placeholderTextColor={appColors.offWhite}
            textContentType="username"
            returnKeyLabel="Submit"
            clearButtonMode="while-editing"
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            selectTextOnFocus={true}
            onChangeText={(value) => { this._handleChange(value, 'username'); }}
          />
        </View>
        <View style={[styles.formItem]}>
          <Text style={[appStyles.label]}>Location</Text>
          <TextInput
            value={location}
            placeholder="Location"
            placeholderTextColor={appColors.offWhite}
            returnKeyLabel="Submit"
            clearButtonMode="while-editing"
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            selectTextOnFocus={true}
            onChangeText={(value) => { this._handleChange(value, 'location'); }}
          />
        </View>
        <View style={[styles.formItem]}>
          <Text style={[appStyles.label]}>Profile Photo</Text>
          <Image
            style={[styles.userImage]}
            source={{ uri: image, cache: 'force-cache' }}
            resizeMode="cover"
          />
          <TouchableOpacity>
            <Icon
              name="edit"
              size={normalizeFont(15)}
              color={appColors.blue}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.formItem]}>
          <Text style={[appStyles.label]}>Banner Image</Text>
          <Image
            style={[styles.banner]}
            source={{ uri: banner, cache: 'force-cache' }}
            resizeMode="cover"
          />
          <TouchableOpacity>
            <Icon
              name="edit"
              size={normalizeFont(15)}
              color={appColors.blue}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => { if (formValid) this._updateProfile(); }}>
          <Text>Save Changes</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default connect(mapStateToProps)(EditProfileScreen);