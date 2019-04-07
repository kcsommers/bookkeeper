import React from 'react';
import { ScrollView } from 'react-native';
import { AlertsService } from '../../core/services/AlertsService';
import { ScreenService } from '../../core/services/ScreenService';
import BkModal from '../components/BkModal.component';

const alertsService = Object.create(AlertsService);
const screenService = Object.create(ScreenService);

export const screenWrapper = (WrappedComponent) => (
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
        modalContent: null,
        alert: null
      };
      this.onNavigation = this.onNavigation.bind(this);
      this.triggerModal = this.triggerModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.closeAlert = this.closeAlert.bind(this);
      this.navigate = this.navigate.bind(this);
    }

    componentWillMount() {
      this.navSubscription$ = this.props.navigation.addListener('willFocus', this.onNavigation);
    }

    componentWillUnmount() {
      this.navSubscription$.remove();
    }

    onNavigation() {
      const alert = alertsService.checkForAlert();
      this.setState({ alert });
      this.wrappedScreen.onNavigation();
    }

    navigate(path, params) {
      if (this.state.modalVisible) {
        this.closeModal();
      }
      this.props.navigation.navigate(path, params);
    }

    triggerModal(template, content, actions) {
      const modalContent = screenService.getModalContent(template, content, actions);
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

    render() {
      const { alert, modalVisible, modalContent } = this.state;
      return (
        <ScrollView>
          <WrappedComponent
            ref={e => { this.wrappedScreen = e; }}
            triggerModal={this.triggerModal}
            closeModal={this.closeModal}
            navigate={this.navigate}
            {...this.props}
          />
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
);