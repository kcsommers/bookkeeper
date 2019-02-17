import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { normalizeFont, appStyles } from '../../assets/styles/appStyles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    width: appStyles.widthPcts.eightyFive,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: appStyles.paddingMd.x,
    paddingRight: appStyles.paddingMd.x,
    paddingTop: appStyles.paddingMd.y,
    paddingBottom: appStyles.paddingMd.y,
    borderRadius: 3
  },
  confirmText: {
    fontFamily: 'Merriweather',
    fontSize: normalizeFont(20),
    marginBottom: appStyles.paddingSm.y
  },
  deleteBtn: {
    backgroundColor: '#c13149',
    paddingTop: appStyles.paddingSm.y,
    paddingBottom: appStyles.paddingSm.y,
    alignItems: 'center',
    borderRadius: 3
  },
  deleteBtnText: {
    color: '#f7f7f7',
    fontFamily: 'Merriweather',
    fontSize: normalizeFont(18)
  },
  cancelBtn: {
    paddingTop: appStyles.paddingMd.y,
    paddingBottom: appStyles.paddingSm.y,
    alignItems: 'center'
  },
  cancelText: {
    color: '#1b9ce2'
  }
});

class ConfirmBox extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.confirmText}>Are You Sure?</Text>
        <View style={{
        }}
        >
          <TouchableOpacity style={styles.deleteBtn} onPress={this.props.onConfirm}>
            <Text style={styles.deleteBtnText}>{this.props.buttonText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={this.props.onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ConfirmBox;