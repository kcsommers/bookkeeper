import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import SearchPage from '../containers/SearchPage';
import searchBooks from '../../assets/images/page_backgrounds/searchBooks.jpg';
import searchClubs from '../../assets/images/page_backgrounds/searchClubs.jpg';
import searchUsers from '../../assets/images/page_backgrounds/searchUsers.jpg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
});

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
        >
          <SearchPage background={searchBooks} navigation={this.props.navigation} />
          <SearchPage background={searchClubs} navigation={this.props.navigation} />
          <SearchPage background={searchUsers} navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

export default SearchScreen;