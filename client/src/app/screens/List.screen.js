import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { EventEmitter } from 'events';
import { connect } from 'react-redux';
import { ScreenService } from '../../core/services/ScreenService';
import { AlertsService } from '../../core/services/AlertsService';
import BookDisplay from '../components/BookDisplay.component';
import BkModal from '../components/BkModal.component';

const screenService = Object.create(ScreenService);
const alertsService = Object.create(AlertsService);
const mapStateToProps = (state) => ({ lists: state.lists });

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      modalVisible: false,
      modalContent: null,
      alert: null
    };
    this._onNavigation = this._onNavigation.bind(this);
    this.navigate = this.navigate.bind(this);
    this.modalTrigger$ = new EventEmitter();
    this.triggerModal = this.triggerModal.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this._getBookDisplays = this._getBookDisplays.bind(this);
  }

  componentWillMount() {
    this.navSubscription$ = this.props.navigation.addListener('willFocus', this._onNavigation);
    this.modalTrigger$.addListener('trigger-modal', this.triggerModal);
    this.modalTrigger$.addListener('close-modal', this.closeModal);
  }

  componentWillUnmount() {
    this.navSubscription$.remove();
    this.modalTrigger$.removeAllListeners();
  }

  _onNavigation() {
    const listId = this.props.navigation.getParam('id');
    const list = this.props.lists[listId];
    this.setState({ list });
  }

  navigate(path, params) {
    this.props.navigation.navigate(path, params);
  }

  triggerModal(args) {
    const modalContent = screenService.getModalContent(args.template, args.content, args.actions);
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
      alert
    });
  }

  closeAlert(alertId) {
    alertsService.removeAlert(alertId);
    this.setState({ alert: null });
  }

  _getBookDisplays(books) {
    return books && books.map(book => (
      <BookDisplay
        key={book.id}
        book={book}
        listId={this.state.list.id}
        navigate={this.navigate}
        modalTrigger={this.modalTrigger$}
      />
    ));
  }

  render() {
    const { list, modalContent, modalVisible, alert } = this.state;
    const books = list && screenService.getItemsById('books', list.bookIds);
    const booksMapped = this._getBookDisplays(books);
    return (
      <View>
        <ScrollView>
          <View>
            <Text>{list && list.name}</Text>
          </View>
          <View>
            {list && booksMapped}
          </View>
        </ScrollView>
        {modalVisible && (
          <BkModal
            isVisible={modalVisible}
            closeModal={this.closeModal}
          >
            {modalContent && modalContent.template}
          </BkModal>
        )}
        {alert && alertsService.getAlertTemplate(alert, this.closeAlert)}
      </View>

    );
  }
}

export default connect(mapStateToProps)(ListScreen);