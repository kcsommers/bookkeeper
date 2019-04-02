import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import BkModal from '../components/BkModal.component';
import { ScreenService } from '../../core/services/ScreenService';
import { HttpService } from '../../core/services/HttpService';
import List from '../../core/classes/models/List';
import { addList } from '../../core/redux/actions/lists.actions';
import { AlertsService } from '../../core/services/AlertsService';
import { styles } from '../../assets/styles/screens/profileScreen.styles';
import { appStyles } from '../../assets/styles/appStyles.styles';
import ListDisplay from '../components/ListDisplay.component';

const screenService = Object.create(ScreenService);
const httpService = Object.create(HttpService);
const alertsService = Object.create(AlertsService);
const mapStateToProps = (state) => ({ user: state.user, lists: state.lists });

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalContent: null,
      listInputValue: '',
      alert: null
    };
    this._triggerModal = this._triggerModal.bind(this);
    this._onNavigation = this._onNavigation.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {
    this.navSubscription$ = this.props.navigation.addListener('willFocus', this._onNavigation);
  }

  componentWillUnmount() {
    this.navSubscription$.remove();
  }

  onListInputChange(value) {
    this.setState({ listInputValue: value });
  }

  _onNavigation() {
    const alert = alertsService.checkForAlert();
    this.setState({ alert });
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
        this.closeModal();
      }).catch(error => {
        console.error('ERROR CREATING LIST', error);
      });
    }
  }

  navigate(listId) {
    const { navigation } = this.props;
    navigation.navigate('List', { id: listId });
  }

  _triggerModal() {
    const actions = {
      createList: this.createList.bind(this),
      listInputChange: this.onListInputChange.bind(this)
    };
    const modalContent = screenService.getModalContent('newListForm', null, actions);
    this.setState({
      modalVisible: true,
      modalContent
    });
  }

  closeModal() {
    const alert = alertsService.checkForAlert();
    this.setState({
      modalVisible: false,
      modalContent: null,
      listInputValue: '',
      alert
    });
  }

  closeAlert(alertId) {
    alertsService.removeAlert(alertId);
    this.setState({ alert: null });
  }

  render() {
    const { modalVisible, modalContent, alert } = this.state;
    const { lists, user } = this.props;
    const listsMapped = Object.keys(lists).map((key) => (
      lists[key].id !== 0
      && (
        <ListDisplay
          key={lists[key].id}
          list={lists[key]}
          onPress={this.navigate}
        />
      )
    ));
    return (
      <ScrollView>
        <View style={[styles.bannerContainer]}>
          <Image
            style={[styles.banner]}
            source={{ uri: user.banner, cache: 'force-cache' }}
            resizeMode="cover"
          />
          <Image
            style={[styles.profilePic]}
            source={{ uri: user.image, cache: 'force-cache' }}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.userInfo]}>
          <Text style={[appStyles.h2, styles.centered]}>{user.username}</Text>
          <Text style={[appStyles.h4i, styles.centered]}>{user.location}</Text>
        </View>
        {listsMapped}
        <TouchableOpacity onPress={this._triggerModal}>
          <Text>New List</Text>
        </TouchableOpacity>
        {modalVisible && (
          <BkModal
            isVisible={modalVisible}
            closeModal={this.closeModal}
          >
            {modalContent && modalContent.template}
          </BkModal>
        )}
        {alert && alertsService.getAlertTemplate(alert, this.closeAlert)}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(ProfileScreen);