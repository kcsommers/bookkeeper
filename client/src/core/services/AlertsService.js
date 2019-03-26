import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Alert from '../classes/Alert';
import { store } from '../redux/store';
import { createAlert, removeAlert } from '../redux/actions/alerts.actions';
import {
  normalizeFont, appColors, appStyles, appHeights
} from '../../assets/styles/appStyles.styles';

const alertStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(247, 247, 247, 0.9)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: appHeights.eightyFive,
    height: appHeights.thirtyFive,
    position: 'absolute'
  },
  text: {
    fontFamily: 'Merriweather',
    fontSize: normalizeFont(25),
    color: '#444',
    textAlign: 'center'
  }
});

export const AlertsService = {
  createAlert(content, icon) {
    const newAlert = new Alert(content, icon, Math.floor(Math.random() * 10000));
    store.dispatch(createAlert(newAlert));
  },

  checkForAlert() {
    const { alert } = store.getState();
    return alert || null;
  },

  removeAlert(alertId) {
    store.dispatch(removeAlert(alertId));
  },

  getAlertTemplate(alert) {
    return (
      <View style={alertStyles.container}>
        <Text style={alertStyles.text}>{alert.content}</Text>
        <Icon
          name={alert.icon}
          size={normalizeFont(20)}
          color={appColors.gray}
        />
      </View>
    );
  }
};