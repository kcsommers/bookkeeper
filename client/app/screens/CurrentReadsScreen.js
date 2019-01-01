import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AppStyling, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/styles/appStyles';
import BookImage from '../widgets/BookImage';
import TouchButton from '../widgets/TouchButton';

const AppStyles = new AppStyling();
const globalStyles = StyleSheet.create(AppStyles.getAppStyles().AppStyles);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  carouselContainer: {

  },
  buttonsContainer: {
    padding: SCREEN_WIDTH * 0.1
  },
  buttonView: {
    padding: SCREEN_HEIGHT * 0.004
  }
});

class CurrentReadsScreen extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={StyleSheet.carouselContainer}>
          <BookImage
            size="large"
            source="http://books.google.com/books/content?id=XV8XAAAAYAAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonView}>
            <TouchButton
              text="New Note"
              type="primary"
            />
          </View>
          <View style={styles.buttonView}>
            <TouchButton
              text="New Search"
              type="primary"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(CurrentReadsScreen);