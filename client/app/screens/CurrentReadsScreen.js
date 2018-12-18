import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import BookImage from '../widgets/BookImage';
import AppStyles from '../../assets/styles/appStyles';
// import Button from '../widgets/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20
  },
  title: {
    fontFamily: AppStyles.h3.fontFamily,
    fontSize: AppStyles.h3.size,
    paddingTop: 10,
    paddingBottom: 10
  }
});

class CurrentReadsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BookImage source="http://books.google.com/books/content?id=XV8XAAAAYAAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" />
        <Text style={styles.title}>Moby Dick</Text>
      </View>
    );
  }
}

export default CurrentReadsScreen;