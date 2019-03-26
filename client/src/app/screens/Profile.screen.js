import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ lists: state.lists });

class ProfileScreen extends React.Component {
  _navigate(listId) {
    const { navigation } = this.props;
    navigation.navigate('List', { id: listId });
  }

  render() {
    const { lists } = this.props;
    const listsMapped = Object.keys(lists).map((key) => (
      <View key={lists[key].id}>
        <TouchableOpacity onPress={() => { this._navigate(lists[key].id); }}>
          <Text>
            {lists[key].name}
          </Text>
        </TouchableOpacity>
      </View>
    ));
    return (
      <View>
        <Text>PROFILE SCREEN</Text>
        {listsMapped}
      </View>
    );
  }
}

export default connect(mapStateToProps)(ProfileScreen);