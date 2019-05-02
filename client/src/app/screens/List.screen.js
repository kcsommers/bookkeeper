import { EventEmitter } from 'events';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import tealWhiteGradient from '../../assets/images/page_backgrounds/tealWhiteGradient.png';
import { screenStyles } from '../../assets/styles/lists/listStyles.styles';
import { ScreenService } from '../../core/services/ScreenService';
import ListComponent from '../components/lists/List.component';
import ListScreenHeader from '../components/lists/ListScreenHeader.component';
import SearchBar from '../components/SearchBar.component';
import SlideInFromTop from '../components/wrappers/SlideInFromTop.component';
import { screenWrapper } from '../wrappers/ScreenWrapper.hoc';

const screenService = Object.create(ScreenService);
const mapStateToProps = (state) => ({ lists: state.lists });

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      searchBarVisible: false,
      booksDisplay: 'full'
    };
    this.searchEvent = new EventEmitter();
    this.onNavigation = this.onNavigation.bind(this);
    this.navigate = this.navigate.bind(this);
    this.showSearchBar = this.showSearchBar.bind(this);
    this.hideSearchbar = this.hideSearchbar.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.searchEvent.addListener('search-done', this.onSearch.bind(this));
  }

  componentWillUnmount() {
    this.searchEvent.removeAllListeners();
  }

  onSearch(results) {
    this.props.navigation.navigate('Search', { results, targetList: this.state.list });
  }

  onNavigation() {
    const listId = this.props.navigation.getParam('id');
    const list = this.props.lists[listId];
    this.books = list && screenService.getItemsById('books', list.bookIds);
    this.setState({ list });
  }

  navigate(path, params) {
    this.props.navigate(path, params);
  }

  triggerModal(args) {
    this.props.triggerModal(args.template, args.content, args.actions);
  }

  closeModal() {
    this.props.closeModal();
  }

  showSearchBar() {
    this.searchBar.input.focus();
    this.setState({ searchBarVisible: true });
  }

  hideSearchbar() {
    this.setState({ searchBarVisible: false });
  }

  changeDisplay(display) {
    this.listComponent.changeDisplay(display);
    this.setState({ booksDisplay: display });
  }

  render() {
    const { list, searchBarVisible, booksDisplay } = this.state;
    return (
      <View style={screenStyles.container}>
        <SlideInFromTop isVisible={searchBarVisible}>
          <SearchBar
            searchEvent={this.searchEvent}
            onBlur={this.hideSearchbar}
            ref={e => { this.searchBar = e; }}
          />
        </SlideInFromTop>

        <ListScreenHeader
          changeDisplay={this.changeDisplay}
          showSearchBar={this.showSearchBar}
        />

        <ListComponent
          booksDisplay={booksDisplay}
          list={list}
          books={this.books}
          triggerModal={this.triggerModal}
          closeModal={this.closeModal}
          navigate={this.navigate}
          ref={e => { this.listComponent = e; }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(screenWrapper(ListScreen, tealWhiteGradient));