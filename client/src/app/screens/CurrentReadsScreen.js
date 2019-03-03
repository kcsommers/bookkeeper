import React from 'react';
import {
  StyleSheet, View, ScrollView, Text
} from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../components/BackgroundImage';

const mapStateToProps = (state) => ({ user: state.user, deviceInfo: state.deviceInfo });
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class CurrentReadsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReads: [],
      currentBook: null
    };
  }

  componentDidMount() {
    console.log('USER', this.props.user);
    // this._setCurrentReads();
  }

  _setCurrentReads() {
    const { user } = this.props;
    const currentReads = [];
    user.books.forEach((book) => {
      if (book.current) {
        currentReads.push(book);
      }
    });
    this.setState({ currentReads, currentBook: currentReads[0] });
  }

  render() {
    const { currentBook } = this.state;
    return (
      <BackgroundImage
        image={currentBook && currentBook.thumbnail}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <Text>HI</Text>
          </View>
        </ScrollView>
      </BackgroundImage>
    );
  }
}


export default connect(mapStateToProps)(CurrentReadsScreen);