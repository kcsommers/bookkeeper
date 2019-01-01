import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AppStyling, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/styles/appStyles';
import BookImage from '../widgets/BookImage';
import TouchButton from '../widgets/TouchButton';
import ModelForm from '../components/forms/ModelForm';

const AppStyles = new AppStyling();
const globalStyles = StyleSheet.create(AppStyles.getAppStyles().AppStyles);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue'
  },
  carouselContainer: {

  }
});

class CurrentReadsScreen extends React.Component {
  _addListToStore(list) {
    console.log('ADDED LIST', list);
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
        <ModelForm
          model="lists"
          submitTitle="Add List"
          modelData={{ userId: this.props.user.id }}
          onSubmit={(list) => { this._addListToStore(list); }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(CurrentReadsScreen);