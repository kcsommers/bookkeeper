import React from 'react';
import {
  StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Text
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import Carousel from '../components/Carousel';
import TextCard from '../components/TextCard';
import { SCREEN_HEIGHT, AppStyling } from '../../assets/styles/appStyles';
import BackgroundImageFull from '../widgets/BackgroundImageFull';
import tealWhiteGradient from '../../assets/images/page_backgrounds/tealWhiteGradient.png';
import Environment from '../../environment';

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
  constructor(props) {
    super(props);
    this.state = {
      newNote: '',
      currentBook: null
    };
  }

  async _handleAddItem(content, endpoint, bookId) {
    const userId = this.props.user.id;
    const url = `${Environment.BASE_URL}/${endpoint}`;
    const modelData = { content, bookId, userId };
    const addItemResults = await axios.post(url, modelData);
    console.log('ADD ITEM RESULTS', addItemResults.data);
  }

  updateCurrentBook(book) {
    this.setState({ currentBook: book });
  }

  render() {
    const { user } = this.props;
    const { lists } = user;
    const books = [];
    lists.forEach((list) => {
      list.books.forEach((book) => {
        if (book.current) {
          books.push(book);
        }
      });
    });
    const noteCards = (this.state.currentBook) ? (
      this.state.currentBook.notes.map((note) => (
        <View key={note.id} style={styles.noteCardWrapper}>
          <TextCard item={note} />
        </View>
      ))
    ) : null;

    return (
      <BackgroundImageFull image={tealWhiteGradient}>
        <ScrollView>
          <View style={styles.carouselContainer}>
            <Carousel
              items={books}
              updateCurrent={(book) => {
                this.updateCurrentBook(book);
              }}
            />
          </View>

          <View style={[{
            backgroundColor: 'rgba(239, 239, 239, 0.4)',
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
              <TouchableOpacity style={[styles.menuBtn, globalStyles.boxShadow, {
                borderTopLeftRadius: 3
              }]}
              >
                <Icon name="pencil" size={22} color="#444" />
                <TextInput
                  style={[styles.input, globalStyles.boxShadow]}
                  placeholder="New Note"
                  placeholderTextColor="#444"
                  multiline={true}
                  onChangeText={(text) => { this.setState({ newNote: text }); }}
                  onSubmitEditing={() => { this.handleAddItem(this.state.newNote); }}
                />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuBtn, globalStyles.boxShadow]}>
                <Icon name="quote" size={22} color="#444" />
                <TextInput
                  style={styles.input}
                  placeholder="New Quote"
                  placeholderTextColor="#444"
                  multiline={true}
                />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuBtn, globalStyles.boxShadow, {
                borderTopRightRadius: 3
              }]}
              >
                <Icon name="check" size={22} color="#444" />
                <TextInput
                  style={styles.input}
                  placeholder="Finished!"
                  placeholderTextColor="#444"
                  multiline={true}
                />
              </TouchableOpacity>
            </View>

            <View style={{
              paddingTop: SCREEN_HEIGHT * 0.007,
              paddingBottom: SCREEN_HEIGHT * 0.007
            }}
            >
              {noteCards}
            </View>
          </View>
        </ScrollView>
      </BackgroundImageFull>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(CurrentReadsScreen);
