import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {

  },
});

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={this.props.placeholder}
          value={this.state.text}
          onChangeText={(text) => { this.setState({ text }); }}
          autoCapitalize="sentences"
          clearButtonMode="while-editing"
          clearTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={() => { }}
          returnKeyLabel="Search"
        />
      </View>
    );
  }
}

export default SearchInput;