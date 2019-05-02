import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { appColors, appStyles, appSpacing, normalizeFont } from '../../../assets/styles/appStyles.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.offWhite,
    borderRadius: 3
  },
  contentText: {
    marginBottom: appSpacing.md.y,
    marginTop: appSpacing.sm.y
  },
  cancelTxt: {
    color: appColors.aqua,
    fontSize: normalizeFont(16),
    textAlign: 'right',
    marginTop: appSpacing.md.y
  },
  deleteBtn: {
    marginBottom: appSpacing.sm.y,
  }
});

export default class ConfirmBox extends React.Component {
  render() {
    const { content, actions } = this.props;
    return (
      <View style={[styles.container, appStyles.paddingMd]}>
        <Text style={[appStyles.h4]}>Are You Sure?</Text>
        <Text style={[appStyles.h5, styles.contentText]}>{content.text}</Text>
        <TouchableOpacity
          style={[appStyles.buttonRed, styles.deleteBtn]}
          onPress={() => { actions.delete(content.id); }}
        >
          <Text style={[appStyles.buttonText]}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { actions.cancel(content.id); }}>
          <Text style={[styles.cancelTxt]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}