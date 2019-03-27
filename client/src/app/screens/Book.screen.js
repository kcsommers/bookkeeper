import React from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import { ScreenService } from '../../core/services/ScreenService';
import Book from '../components/Book.component';
import BkModal from '../components/BkModal.component';
import { AlertsService } from '../../core/services/AlertsService';
import { bookScreenStyles } from '../../assets/styles/bookScreen.styles';

const alertsService = Object.create(AlertsService);
const screenService = Object.create(ScreenService);
const mapStateToProps = (state) => ({
  books: state.books,
  modalTrigger$: state.events.modalTrigger
});

class BookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null,
      modalVisible: false,
      currentModalContent: null,
      alert: null
    };
    this._onNavigation = this._onNavigation.bind(this);
    this._triggerModal = this._triggerModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.navigate = this.navigate.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentWillMount() {
    const { navigation, modalTrigger$ } = this.props;
    modalTrigger$.addListener('trigger-modal', this._triggerModal);
    modalTrigger$.addListener('close-modal', this._closeModal);
    modalTrigger$.addListener('trigger-nav', this.navigate);
    this.navSubscription$ = navigation.addListener('willFocus', this._onNavigation);
  }

  componentWillUnmount() {
    this.navSubscription$.remove();
    this.props.modalTrigger$.removeAllListeners();
  }

  _onNavigation() {
    const alert = alertsService.checkForAlert();
    const bookId = this.props.navigation.getParam('id');
    const currentBook = this.props.books[bookId];
    this.setState({ currentBook, alert });
  }

  navigate(routeData) {
    if (this.state.modalVisible) {
      this._closeModal();
    }

    const { path, params } = routeData;
    this.props.navigation.navigate(path, params);
  }

  _triggerModal(args) {
    const currentModalContent = screenService.getModalContent(args.template, args.content, args.actions);
    this.setState({
      modalVisible: true,
      currentModalContent
    });
  }

  _closeModal() {
    const alert = alertsService.checkForAlert();
    this.setState({
      modalVisible: false,
      currentModalContent: null,
      alert
    });
  }

  closeAlert(alertId) {
    alertsService.removeAlert(alertId);
    this.setState({ alert: null });
  }

  render() {
    const {
      currentBook, modalVisible, currentModalContent, alert
    } = this.state;
    return (currentBook) ? (
      <View style={[bookScreenStyles.container]}>
        <Book book={currentBook} navigate={this.navigate} />
        {modalVisible && (
          <BkModal isVisible={modalVisible}>
            {currentModalContent && currentModalContent.template}
          </BkModal>
        )}
        {alert && alertsService.getAlertTemplate(alert, this.closeAlert)}
      </View>
    ) : null;
  }
}

export default connect(mapStateToProps)(BookScreen);