import React from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyling } from '../../assets/styles/appStyles';

const AppStyles = new AppStyling();
const globalStyles = AppStyles.getAppStyles();

const styles = StyleSheet.create({
  menuBtn: {
    alignItems: 'center',
    paddingTop: globalStyles.paddingMd.y,
    paddingBottom: globalStyles.paddingMd.y,
    backgroundColor: '#fff'
  },
  text: {
    fontFamily: 'Merriweather'
  }
});

class ClickMenu extends React.Component {
  constructor(props) {
    super(props);
    this.menuAnim = new Animated.Value(0);
    this.newNoteAnim = new Animated.Value(0);
    this.newQuoteAnim = new Animated.Value(0);
    this.finishedBtnAnim = new Animated.Value(0);
    this._animateMenu = this._animateMenu.bind(this);
  }

  _animateMenu() {
    Animated.parallel([
      Animated.timing(this.newNoteAnim, {
        duration: 250,
        toValue: 1
      }),
      Animated.timing(this.newQuoteAnim, {
        duration: 250,
        toValue: 1
      }),
      Animated.timing(this.finishedBtnAnim, {
        duration: 250,
        toValue: 1
      }),
      Animated.timing(this.menuAnim, {
        duration: 250,
        toValue: 1
      })
    ]).start();
  }

  render() {
    return (
      <Animated.View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: this.menuAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['#fff', '#ddd']
        })
      }}
      >
        <Animated.View style={{
          flexGrow: 1,
          opacity: this.newNoteAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })
        }}
        >
          <TouchableOpacity
            style={[
              styles.menuBtn,
              globalStyles.boxShadow,
              {
                borderTopLeftRadius: 3,
              }
            ]}
            onPress={() => { this.props.onClick('newNote'); }}
          >
            <Icon name="pencil" size={22} color="#444" />
            <Text style={[styles.text]}>
              New Note
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{
          flexGrow: 1,
          opacity: this.newQuoteAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })
        }}
        >
          <TouchableOpacity
            style={[
              styles.menuBtn,
              globalStyles.boxShadow,
              {
                borderTopLeftRadius: 3,
              }
            ]}
            onPress={() => { this.props.onClick('newQuote'); }}
          >
            <Icon name="quote" size={22} color="#444" />
            <Text style={styles.text}>New Quote</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{
          flexGrow: 1,
          opacity: this.finishedBtnAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })
        }}
        >
          <TouchableOpacity
            style={[
              styles.menuBtn,
              globalStyles.boxShadow,
              {
                borderTopLeftRadius: 3,
              }
            ]}
            onPress={this._animateMenu}
          >
            <Icon name="check" size={22} color="#444" />
            <Text style={styles.text}>Finished!</Text>
          </TouchableOpacity>
        </Animated.View>

      </Animated.View>
    );
  }
}

export default ClickMenu;