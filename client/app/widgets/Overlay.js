import React from 'react';
import {
  Animated, TouchableWithoutFeedback
} from 'react-native';
import { appStyles } from '../../assets/styles/appStyles';
import TextCardEdit from '../components/TextCardEdit';
import ConfirmBox from '../components/ConfirmBox';


class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showConfirmBox: false };
    this.overlayAnim = new Animated.Value(0);
    this.textCardAnim = new Animated.Value(0);
    this.confirmBoxAnim = new Animated.Value(0);
    this.confirmBoxOpacity = new Animated.Value(0);
    this._fadeOut = this._fadeOut.bind(this);
    this._triggerConfirmBox = this._triggerConfirmBox.bind(this);
    this._closeConfirmBox = this._closeConfirmBox.bind(this);
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.overlayAnim, {
        duration: 500,
        toValue: 1
      }),
      Animated.timing(this.textCardAnim, {
        duration: 500,
        toValue: 1
      })
    ]).start();
    this.props.eventEmitter.addListener('noteDeleted', this._fadeOut);
    this.props.eventEmitter.addListener('noteUpdated', this._fadeOut);
    this.confirmFunc = this.textCardEdit.handleDelete;
  }

  componentWillUnmount() {
    this.props.eventEmitter.removeListener('noteDeleted', this._fadeOut);
    this.props.eventEmitter.removeListener('noteUpdated', this._fadeOut);
  }

  _triggerConfirmBox() {
    this.setState({ showConfirmBox: true });
    Animated.parallel([
      Animated.timing(this.textCardAnim, {
        duration: 300,
        toValue: 0
      }),
      Animated.timing(this.confirmBoxAnim, {
        duration: 300,
        toValue: 1
      }),
      Animated.timing(this.confirmBoxOpacity, {
        duration: 500,
        toValue: 1
      })
    ]).start();
  }

  _fadeOut(eventType) {
    Animated.parallel([
      Animated.timing(this.overlayAnim, {
        duration: 500,
        toValue: 0
      }),
      Animated.timing(this.textCardAnim, {
        duration: 500,
        toValue: 0
      })
    ]).start(() => {
      this.props.onFadeFinish(eventType);
    });
  }

  _closeConfirmBox(isConfirmed) {
    if (isConfirmed) {
      Animated.timing(this.confirmBoxOpacity, {
        duration: 200,
        toValue: 0
      }).start();
    } else {
      Animated.parallel([
        Animated.timing(this.textCardAnim, {
          duration: 500,
          toValue: 1
        }),
        Animated.timing(this.confirmBoxOpacity, {
          duration: 200,
          toValue: 0
        }),
        Animated.timing(this.confirmBoxAnim, {
          duration: 200,
          toValue: 0
        })
      ]).start(() => {
        this.setState({ showConfirmBox: false });
      });
    }
  }

  render() {
    const confirmBoxZIndex = (this.state.showConfirmBox) ? 100 : -100;
    return (
      <TouchableWithoutFeedback onPress={() => {
        if (this.state.showConfirmBox) {
          this._closeConfirmBox(false);
        } else {
          this._fadeOut(null);
        }
      }}
      >
        <Animated.View style={[{
          position: 'absolute',
          width: appStyles.widthPcts.full,
          height: appStyles.heightPcts.full,
          justifyContent: 'center',
          zIndex: 900,
          backgroundColor: this.overlayAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', 'rgba(34, 34, 34, 0.9)']
          })
        }]}
        >
          <Animated.View style={[{
            marginTop: -50,
            transform: [{
              scale: this.overlayAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.5, 1.2, 1]
              })
            }],
            opacity: this.textCardAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0.5, 1]
            })
          }]}
          >
            <TextCardEdit
              item={this.props.content.data}
              endpoint={this.props.content.endpoint}
              onDeletePress={this._triggerConfirmBox}
              eventEmitter={this.props.eventEmitter}
              ref={(e) => { this.textCardEdit = e; }}
            />
          </Animated.View>

          <Animated.View style={{
            position: 'absolute',
            width: appStyles.widthPcts.full,
            height: appStyles.heightPcts.full,
            marginRight: 'auto',
            marginLeft: 'auto',
            justifyContent: 'center',
            zIndex: confirmBoxZIndex,
            opacity: this.confirmBoxOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            }),
            transform: [{
              translateY: this.confirmBoxAnim.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [-50, 20, 0]
              })
            }]
          }}
          >
            <ConfirmBox
              buttonText="Delete"
              onConfirm={() => {
                this._closeConfirmBox(true);
                this.confirmFunc();
              }}
              onCancel={() => { this._closeConfirmBox(false); }}
            />
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Overlay;