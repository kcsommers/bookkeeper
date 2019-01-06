import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import BookResult from '../components/BookResult';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

class SearchScreen extends React.Component {
  render() {
    const results = this.props.navigation.getParam('results');
    const searchType = this.props.navigation.getParam('searchType');
    const resultsMapped = results.map((item) => {
      if (searchType === 'books') {
        return <BookResult book={item.volumeInfo} key={item.id} />;
      }
      return 'What the heck are you searching for?';
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          {resultsMapped}
        </ScrollView>
      </View>
    );
  }
}

export default SearchScreen;