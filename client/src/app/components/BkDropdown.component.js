import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { appColors, appHeights, appStyles, appWidths, normalizeFont } from '../../assets/styles/appStyles.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  triggerBtn: {
    backgroundColor: appColors.offWhite,
    borderRadius: 3
  },
  contentContainer: {
    backgroundColor: appColors.offWhite,
    position: 'absolute'
  }
});

export default class BkDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      label: '',
      modal: false,
      top: 0,
      left: 0,
      width: 0
    };
    this._trigger = this._trigger.bind(this);
    this._close = this._close.bind(this);
    this.updateContainerRef = this._updateRef.bind(this, 'container');
  }

  componentWillMount() {
    const { value, buttonLabel, data } = this.props;
    let label;
    if (buttonLabel) {
      label = buttonLabel;
    } else if (value) {
      const initialValue = data.find(datum => datum.value === value);
      label = initialValue && (initialValue.label || 'Select');
    } else {
      label = 'Select';
    }
    this.setState({ label });
  }

  getValue() {
    return this.state.value;
  }

  _updateRef(name, ref) {
    this[name] = ref;
  }

  _trigger() {
    this.container.measureInWindow((x, y, containerWidth) => {
      this.setState({
        modal: true,
        top: y,
        left: x,
        width: containerWidth
      });
    });
  }

  _close() {
    this.setState({ modal: false, left: 0, top: 0, width: 0 });
  }

  _getTrigger() {
    const { icon } = this.props;
    const { label } = this.state;
    return icon ? (
      <TouchableWithoutFeedback onPress={this._trigger}>
        <Icon
          name={icon}
          size={normalizeFont(30)}
          color={appColors.gray}
        />
      </TouchableWithoutFeedback>
    )
      : (
        <TouchableWithoutFeedback onPress={this._trigger}>
          <View style={[styles.triggerBtn, appStyles.boxShadow, appStyles.paddingMd]}>
            <Text style={[appStyles.p]}>{label}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
  }

  render() {
    const { data, onSelect, explicitWidth } = this.props;
    const { modal, top, left, width } = this.state;
    const trigger = this._getTrigger();
    return (
      <View style={[styles.container]} ref={this.updateContainerRef}>
        {trigger}
        <Modal
          visible={modal}
          transparent={true}
          onRequestClose={this._close}
          supportedOrientations={['portrait']}
        >
          <TouchableWithoutFeedback onPress={this._close}>
            <View style={{ width: appWidths.full, height: appHeights.device }}>
              <View
                style={[styles.contentContainer, appStyles.boxShadow, {
                  width: explicitWidth || width,
                  left: explicitWidth ? left - explicitWidth : left,
                  top
                }]}
              >
                {data && data.length && data.map(datum => (
                  <TouchableOpacity
                    key={Math.floor(Math.random() * 10000)}
                    style={[appStyles.paddingMd]}
                    onPress={() => {
                      onSelect(datum.value);
                      this.setState({ value: datum.value, label: datum.label });
                      this._close();
                    }}
                  >
                    <Text style={[appStyles.p]}>
                      {datum.label}
                    </Text>
                  </TouchableOpacity>))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}