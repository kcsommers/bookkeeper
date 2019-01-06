import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import ModelForm from '../components/forms/ModelForm';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

class ListScreen extends React.Component {
  _addListToStore(list) {
    console.log('ADDED LIST', list);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>List Screen</Text>
        <ModelForm
          model="lists"
          submitTitle="Add List"
          modelData={{ userId: this.props.user.id }}
          onSubmit={(list) => { this._addListToStore(list); }}
        />
      </View>
    );
  }
}

export default ListScreen;