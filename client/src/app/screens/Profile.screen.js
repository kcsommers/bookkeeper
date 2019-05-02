import { EventEmitter } from 'events';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { appColors, appStyles, normalizeFont } from '../../assets/styles/appStyles.styles';
import { styles } from '../../assets/styles/screens/profileScreen.styles';
import { addList } from '../../core/redux/actions/lists.actions';
import { AlertsService } from '../../core/services/AlertsService';
import { GlobalService } from '../../core/services/GlobalService';
import ListPreview from '../components/lists/ListPreview.component';
import SearchBar from '../components/SearchBar.component';
import SlideInFromTop from '../components/wrappers/SlideInFromTop.component';
import { screenWrapper } from '../wrappers/ScreenWrapper.hoc';

const globalService = Object.create(GlobalService);
const alertsService = Object.create(AlertsService);
const mapStateToProps = (state) => ({ user: state.user, lists: state.lists });

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarVisible: false,
      targetList: null
    };
    this._triggerModal = this._triggerModal.bind(this);
    this.onNavigation = this.onNavigation.bind(this);
    this.showSearchBar = this.showSearchBar.bind(this);
    this.hideSearchbar = this.hideSearchbar.bind(this);
    this.searchEvent = new EventEmitter();
  }

  componentWillMount() {
    this.searchEvent.addListener('search-done', this.onSearch.bind(this));
  }

  componentWillUnmount() {
    this.searchEvent.removeAllListeners();
  }

  onNavigation() {
    console.log('NAVIGATED TO PROFILE');
  }

  onSearch(results) {
    const { targetList } = this.state;
    this.props.navigation.navigate('Search', { results, targetList });
  }

  onCreateList(newList) {
    const store = globalService.getStore();
    store.dispatch(addList(newList));
    alertsService.createAlert('List Added', 'check');
    this.props.closeModal();
  }

  _triggerModal() {
    const template = 'newListForm';
    const actions = {
      onCreateList: this.onCreateList.bind(this)
    };
    this.props.triggerModal(template, null, actions);
  }

  showSearchBar(targetList) {
    this.props.scrollToTop();
    this.searchBar.input.focus();
    this.setState({ searchBarVisible: true, targetList });
  }

  hideSearchbar() {
    this.setState({ searchBarVisible: false });
  }

  render() {
    const { lists, user } = this.props;
    const { searchBarVisible } = this.state;
    const listsMapped = Object.keys(lists).map((key) => (
      <ListPreview
        key={lists[key].id}
        list={lists[key]}
        navigate={this.props.navigate}
        showSearchBar={this.showSearchBar}
      />
    ));
    return (
      <View style={[styles.container]}>
        <SlideInFromTop isVisible={searchBarVisible}>
          <SearchBar
            searchEvent={this.searchEvent}
            onBlur={this.hideSearchbar}
            ref={e => { this.searchBar = e; }}
          />
        </SlideInFromTop>

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