import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppStyling from '../../assets/styles/appStyles';
import BookImage from '../widgets/BookImage';
// import Button from '../widgets/Button';

const AppStyles = new AppStyling();
const globalStyles = StyleSheet.create(AppStyles.getAppStyles().AppStyles);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20
  },
  title: {
    fontFamily: globalStyles.h3.fontFamily,
    fontSize: globalStyles.h3.size,
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