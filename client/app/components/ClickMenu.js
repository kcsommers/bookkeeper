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
    this.state = {
      display: 'flex'
    };
    this.menuAnim = new Animated.Value(0);
    this._showMenu = this._showMenu.bind(this);
    this._hideMenu = this._hideMenu.bind(this);
  }

  _showMenu() {
    this.setState({ display: 'flex' });
    Animated.timing(this.menuAnim, {
      duration: 250,
      toValue: 0
    }).start();
  }

  _hideMenu() {
    Animated.timing(this.menuAnim, {
      duration: 250,
      toValue: 1
    }).start(() => {
      this.setState({ display: 'none' });
    });
  }

  render() {
    return (
      <Animated.View style={{
        display: this.state.display,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        opacity: this.menuAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }}
      >
        <Animated.View style={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={[
              styles.menuBtn,
              globalStyles.boxShadow,
              {
                borderTopLeftRadius: 3
              }
            ]}
            onPress={() => {
              this._hideMenu();
              this.props.onClick('newNote');
            }}
          >
            <Icon name="pencil" size={22} color="#444" />
            <Text style={[styles.text]}>
              New Note
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={[
              styles.menuBtn,
              globalStyles.boxShadow,
            ]}
            onPress={() => {
              this._hideMenu();
              this.props.onClick('newQuote');
            }}
          >
            <Icon name="quote" size={22} color="#444" />
            <Text style={styles.text}>New Quote</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ flexGrow: 1 }}>
          <TouchableOpacity
            style={[
              styles.menuBtn,
              globalStyles.boxShadow,
              {
                borderTopRightRadius: 3
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