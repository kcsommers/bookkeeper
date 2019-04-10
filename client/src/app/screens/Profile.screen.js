import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { ScreenService } from '../../core/services/ScreenService';
import { HttpService } from '../../core/services/HttpService';
import List from '../../core/classes/models/List';
import { addList } from '../../core/redux/actions/lists.actions';
import { AlertsService } from '../../core/services/AlertsService';
import { styles } from '../../assets/styles/screens/profileScreen.styles';
import { appStyles, normalizeFont, appColors } from '../../assets/styles/appStyles.styles';
import ListDisplay from '../components/ListDisplay.component';
import { screenWrapper } from '../wrappers/ScreenWrapper.hoc';

const screenService = Object.create(ScreenService);
const httpService = Object.create(HttpService);
const alertsService = Object.create(AlertsService);
const mapStateToProps = (state) => ({ user: state.user, lists: state.lists });

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listInputValue: '',
    };
    this._triggerModal = this._triggerModal.bind(this);
    this.onNavigation = this.onNavigation.bind(this);
  }

  onNavigation() {
    console.log('NAVIGATED TO PROFILE');
  }

  onListInputChange(value) {
    this.setState({ listInputValue: value });
  }

  _triggerModal() {
    const template = 'newListForm';
    const actions = {
      createList: this.createList.bind(this),
      listInputChange: this.onListInputChange.bind(this)
    };
    this.props.triggerModal(template, null, actions);
  }

  createList() {
    const { listInputValue } = this.state;
    const itemData = {
      name: listInputValue,
      userId: this.props.user.id
    };
    if (listInputValue) {
      httpService.create('lists', { itemData }).then(createdList => {
        const store = screenService.getStore();
        const newList = new List(createdList.id, createdList.name, createdList.userId, []);
        store.dispatch(addList(newList));
        alertsService.createAlert('List Added', 'check');
        this.props.closeModal();
      }).catch(error => {
        console.error('ERROR CREATING LIST', error);
      });
    }
  }

  render() {
    const { lists, user } = this.props;
    const listsMapped = Object.keys(lists).map((key) => (
      lists[key].id !== 0
      && (
        <ListDisplay
          key={lists[key].id}
          list={lists[key]}
          navigate={this.props.navigate}
        />
      )
    ));
    return (
      <View style={[styles.container]}>
        <View style={[styles.bannerContainer]}>
          <Image
            style={[styles.banner]}
            source={{ uri: user.banner, cache: 'force-cache' }}
            resizeMode="cover"
          />
          <Image
            style={[styles.profilePic, appStyles.boxShadow]}
            source={{ uri: user.image, cache: 'force-cache' }}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.userInfo]}>
          <Text style={[appStyles.h2, styles.centered]}>{user.username}</Text>
          <Text style={[appStyles.h4i, styles.centered]}>{user.location}</Text>
        </View>
        <View style={[appStyles.paddingSm]}>
          {listsMapped}
        </View>
        <View style={[styles.addListBtnContainer]}>
          <TouchableOpacity
            onPress={this._triggerModal}
            style={[styles.addListBtn, appStyles.paddingMd]}
          >
            <View style={[styles.addListBtnIconWrapper, appStyles.boxShadow]}>
              <Icon
                name="plus"
                size={normalizeFont(30)}
                color={appColors.blue}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(screenWrapper(ProfileScreen));