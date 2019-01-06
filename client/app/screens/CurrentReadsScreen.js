import React from 'react';
import {
  StyleSheet, View, ScrollView, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Carousel from '../components/Carousel';
import TextCard from '../components/TextCard';
import { SCREEN_WIDTH, SCREEN_HEIGHT, AppStyling } from '../../assets/styles/appStyles';
import BackgroundImageFull from '../widgets/BackgroundImageFull';
import tealWhiteGradient from '../../assets/images/page_backgrounds/tealWhiteGradient.png';

const AppStyles = new AppStyling();
const globalStyles = AppStyles.getAppStyles();

const styles = StyleSheet.create({
  carouselContainer: {
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  noteCardWrapper: {
    paddingTop: SCREEN_HEIGHT * 0.007,
    paddingBottom: SCREEN_HEIGHT * 0.007,
    marginBottom: SCREEN_HEIGHT * 0.007,
    marginTop: SCREEN_HEIGHT * 0.007,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%'
  },
  menuBtn: {
    alignItems: 'center',
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.02,
    paddingBottom: SCREEN_HEIGHT * 0.02,
    backgroundColor: '#fff',
  },
  input: {
    fontFamily: 'Merriweather'
  }
});

class CurrentReadsScreen extends React.Component {
  render() {
    const { user } = this.props;
    const { lists } = user;
    const books = [];
    const bookThumbs = [];
    lists.forEach((list) => {
      list.books.forEach((book) => {
        if (book.current) {
          books.push(book);
          bookThumbs.push(book.thumbnail);
        }
      });
    });
    const noteCards = (
      <View style={{
        paddingTop: SCREEN_HEIGHT * 0.007,
        paddingBottom: SCREEN_HEIGHT * 0.007
      }}
      >
        <View style={styles.noteCardWrapper}>
          <TextCard />
        </View>
        <View style={styles.noteCardWrapper}>
          <TextCard />
        </View>
        <View style={styles.noteCardWrapper}>
          <TextCard />
        </View>
        <View style={styles.noteCardWrapper}>
          <TextCard />
        </View>
      </View>
    );

    return (
      <BackgroundImageFull image={tealWhiteGradient}>
        <ScrollView>
          <View style={styles.carouselContainer}>
            <Carousel images={bookThumbs} />
          </View>

          <View style={[{
            backgroundColor: 'rgba(239, 239, 239, 0.8)',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: SCREEN_HEIGHT * 0.007,
            borderRadius: '5px',
          }, globalStyles.boxShadow]}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
            >
              <View style={[styles.menuBtn, globalStyles.boxShadow]}>
                <Icon name="pencil" size={22} color="#444" />
                <TextInput
                  style={[styles.input, globalStyles.boxShadow]}
                  placeholder="New Note"
                  placeholderTextColor="#444"
                  multiline={true}
                />
              </View>

              <View style={[styles.menuBtn, globalStyles.boxShadow]}>
                <Icon name="quote" size={22} color="#444" />
                <TextInput
                  style={styles.input}
                  placeholder="New Quote"
                  placeholderTextColor="#444"
                  multiline={true}
                />
              </View>

              <View style={[styles.menuBtn, globalStyles.boxShadow]}>
                <Icon name="check" size={22} color="#444" />
                <TextInput
                  style={styles.input}
                  placeholder="Finished!"
                  placeholderTextColor="#444"
                  multiline={true}
                />
              </View>
            </View>

            {noteCards}
          </View>
        </ScrollView>
      </BackgroundImageFull>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(CurrentReadsScreen);