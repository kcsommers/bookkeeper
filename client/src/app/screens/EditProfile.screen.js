import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { appColors, appStyles, normalizeFont } from '../../assets/styles/appStyles.styles';
import { styles } from '../../assets/styles/screens/editProfile.styles';
import { AlertsService } from '../../core/services/AlertsService';
import { HttpService } from '../../core/services/HttpService';
import ImagePicker from '../components/ImagePicker.component';
import { GlobalService } from '../../core/services/GlobalService';

const httpService = Object.create(HttpService);
const globalService = Object.create(GlobalService);
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

  _handleChange(field, value) {
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

  _prepNewData() {
    const { inputs } = this.state;
    const { user } = this.props;
    const itemData = {};
    const uploads = [];
    Object.keys(inputs).forEach(field => {
      if (inputs[field] !== user[field]) {
        if (field === 'image' || field === 'banner') {
          uploads.push({ name: field, value: inputs[field] });
        } else {
          itemData[field] = inputs[field];
        }
      }
    });

    if (uploads.length) {
      httpService.upload(uploads).then(response => {
        response.data.forEach(file => {
          itemData[file.name] = file.value;
        });
        this._updateProfile(itemData);
      }).catch(error => {
        console.error('EDIT PROFILE ERROR UPLOADING', error);
      });
    } else {
      this._updateProfile(itemData);
    }
  }

  _updateProfile(itemData) {
    const { user } = this.props;
    const endpoint = `users/update/${user.id}`;
    httpService.update(endpoint, { itemData }).then(success => {
      if (success) {
        user.update(globalService.getStore(), itemData);
        alertsService.createAlert('Profile Updated', 'check');
        this.props.navigation.navigate('Profile');
      }
    }).catch(error => {
      console.error('ERROR UPDATING PROFILE', error);
    });
  }

  render() {
    const { formValid, inputs } = this.state;
    const { image, username, location, banner } = inputs;
    return (
      <ScrollView contentContainerStyle={[styles.container]}>
        <View style={[styles.formItem]}>
          <View style={[styles.imageWrapper]}>
            <Image
              style={[styles.userImage]}
              source={{ uri: image.uri || image, cache: 'force-cache' }}
              resizeMode="cover"
            />
            <ImagePicker
              onUpload={(uri) => { this._handleChange('image', uri); }}
              buttonStyles={[styles.editBtn, styles.userImgEditBtn, appStyles.boxShadow]}
            >
              <Icon
                name="edit"
                size={normalizeFont(15)}
                color={appColors.blue}
              />
            </ImagePicker>
          </View>
        </View>
        <View style={[styles.formItem]}>
          <Text style={[appStyles.label, styles.formLabel]}>Username</Text>
          <View style={[styles.inputWrapper]}>
            <TextInput
              style={[appStyles.p]}
              value={username}
              placeholder="Username"
              placeholderTextColor={appColors.offWhite}
              textContentType="username"
              returnKeyLabel="Submit"
              clearButtonMode="while-editing"
              blurOnSubmit={true}
              enablesReturnKeyAutomatically={true}
              selectTextOnFocus={true}
              onChangeText={(value) => { this._handleChange('username', value); }}
            />
          </View>
        </View>
        <View style={[styles.formItem]}>
          <Text style={[appStyles.label, styles.formLabel]}>Location</Text>
          <View style={[styles.inputWrapper]}>
            <TextInput
              style={[appStyles.p]}
              value={location}
              placeholder="Location"
              placeholderTextColor={appColors.offWhite}
              returnKeyLabel="Submit"
              clearButtonMode="while-editing"
              blurOnSubmit={true}
              enablesReturnKeyAutomatically={true}
              selectTextOnFocus={true}
              onChangeText={(value) => { this._handleChange('location', value); }}
            />
          </View>
        </View>

        <View style={[styles.formItem]}>
          <Text style={[appStyles.label, styles.formLabel]}>Banner Image</Text>
          <View style={[styles.imageWrapper]}>
            <Image
              style={[styles.banner]}
              source={{ uri: banner.uri || banner, cache: 'force-cache' }}
              resizeMode="cover"
            />
            <ImagePicker
              onUpload={(uri) => { this._handleChange('banner', uri); }}
              buttonStyles={[styles.editBtn, appStyles.boxShadow]}
            >
              <Icon
                name="edit"
                size={normalizeFont(15)}
                color={appColors.blue}
              />
            </ImagePicker>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveBtn]}
          onPress={() => { if (formValid) this._prepNewData(); }}
        >
          <Text style={[appStyles.buttonText]}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(EditProfileScreen);