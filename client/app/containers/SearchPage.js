import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated
} from 'react-native';

import { appStyles, normalizeFont } from '../../assets/styles/appStyles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: appStyles.widthPcts.full,
    position: 'relative',
    backgroundColor: '#f1f3ee',
    paddingTop: appStyles.paddingMd.y,
    paddingBottom: appStyles.paddingMd.y,
    paddingLeft: appStyles.paddingMd.x,
    paddingRight: appStyles.paddingMd.x
  },
  titleContainer: {
    paddingTop: appStyles.paddingLg.y,
    paddingBottom: appStyles.paddingLg.y,
    paddingLeft: appStyles.paddingLg.x,
    paddingRight: appStyles.paddingLg.x,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Merriweather',
    fontSize: normalizeFont(22),
    color: '#1c4b44',
    textAlign: 'center'
  }
});

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.pageAnim = new Animated.Value(0);
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getPageDetails = this._getPageDetails.bind(this);
  }

  _handleSubmit() {
    const { searchTerm } = this.state;
    if (searchTerm) {
      this.props.searchFunction(searchTerm, this.props.screenType);
    } else {
      console.warn('UHH GOTTA SEARCH SOMETHING');
    }
  }

  _handleChange(value) {
    this.setState({ searchTerm: value });
  }

  _getPageDetails() {
    switch (this.props.screenType) {
      case 'books':
        return {
          title: 'Search books by author title or isbn',
          placeholder: 'Search books'
        };
      case 'users':
        return {
          title: 'Find Fellow Readers',
          placeholder: 'Search users'
        };
      default:
        return null;
    }
  }

  render() {
    const { title, placeholder } = this._getPageDetails();
    return (
      <Animated.View style={[styles.container, {
        height: this.pageAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [
            appStyles.heightPcts.full,
            appStyles.heightPcts.full - this.props.keyboardHeight
          ]
        })
      }]}
      >
        <View style={[{
          backgroundColor: '#f1f3ee',
          paddingTop: appStyles.paddingMd.y,
          paddingBottom: appStyles.paddingMd.y,
          paddingLeft: appStyles.paddingMd.x,
          paddingRight: appStyles.paddingMd.x
        }]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={[appStyles.boxShadow, {
            backgroundColor: '#f7f7f7',
            paddingTop: appStyles.paddingMd.y,
            paddingBottom: appStyles.paddingMd.y,
            paddingLeft: appStyles.paddingMd.x,
            paddingRight: appStyles.paddingMd.x
          }]}
          >
            <TextInput
              keyboardType="default"
              placeholder={placeholder}
              placeholderTextColor="#444"
              returnKeyLabel="Search"
              clearButtonMode="while-editing"
              blurOnSubmit={true}
              enablesReturnKeyAutomatically={true}
              selectTextOnFocus={true}
              onChangeText={($value, field) => { this._handleChange($value, field); }}
              onFocus={() => { }}
              onBlur={() => { }}
              onSubmitEditing={() => { }}
              style={[styles.input]}
            />
          </View>
          <View style={{
            paddingTop: appStyles.paddingMd.y,
            paddingBottom: appStyles.paddingMd.y,
            paddingLeft: appStyles.paddingMd.x,
            paddingRight: appStyles.paddingMd.x
          }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 3,
                padding: appStyles.paddingMd.y,
                backgroundColor: '#c13149',
                width: appStyles.widthPcts.fifty,
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
              onPress={this._handleSubmit}
            >
              <Text style={{
                color: '#f7f7f7',
                textAlign: 'center',
                fontSize: normalizeFont(16),
                fontFamily: 'Merriweather'
              }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}

export default SearchPage;