import React from 'react';
import Alert from '../classes/Alert';
import AlertComponent from '../../app/components/Alert.component';
import { store } from '../redux/store';
import { createAlert, removeAlert } from '../redux/actions/alerts.actions';

export const AlertsService = {
  createAlert(content, icon) {
    this.newAlert = new Alert(content, icon, Math.floor(Math.random() * 10000));
    store.dispatch(createAlert(this.newAlert));
  },

  checkForAlert() {
    const { alert } = store.getState();
    return alert || null;
  },

  removeAlert(alertId) {
    store.dispatch(removeAlert(alertId));
  },

  getAlertTemplate(alert, closeAlert) {
    return (
      <AlertComponent alert={alert} closeAlert={closeAlert} />
    );
  }
};