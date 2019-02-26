import React from 'react';
import {
  StyleSheet, View, ScrollView, Image
} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ user: state.user, deviceInfo: state.deviceInfo });
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class CurrentReadsScreen extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={StyleSheet.carouselContainer}>
          <Image
            style={[{
              borderWidth: 2,
              borderColor: '#fff',
              borderRadius: 5
            }]}
            source={{ uri: this.props.source, cache: 'force-cache' }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    );
  }
}


export default connect(mapStateToProps)(CurrentReadsScreen);