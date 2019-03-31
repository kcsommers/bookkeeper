import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { appStyles, appSpacing, appColors, appWidths } from '../../assets/styles/appStyles.styles';

const styles = StyleSheet.create({
  thumbnailBtn: {
    width: appWidths.thirtyFive,
    height: appWidths.thirtyFive * 1.54
  },
  thumbnail: {
    width: '100%',
    height: '100%'
  }
});

class BookDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.dropdownOptions = [
      { value: 'Remove from list' },
      { value: 'Move to new list' },
      { value: 'Edit description' },
      { value: 'Change banner image' }
    ];
    this._onDropdownSelect = this._onDropdownSelect.bind(this);
  }

  _onDropdownSelect(selection) {
    switch (selection) {
      case 'Remove from list': {
        break;
      }
      case 'Move to new list': {
        break;
      }
      case 'Edit description': {
        break;
      }
      case 'Change banner image': {
        break;
      }
      default: {
        console.error(selection, 'is not a valid selection');
      }
    }
  }

  render() {
    const { book, navigate } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={[styles.thumbnailBtn]}
          onPress={() => { navigate('Book', { id: book.id }); }}
        >
          <Image
            style={[styles.thumbnail]}
            source={{ uri: book.thumbnail, cache: 'force-cache' }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text>{book.description}</Text>
        <Dropdown
          data={this.dropdownOptions}
          value="Options"
          onChangeText={(selection) => { this._onDropdownSelect(selection); }}
        />
      </View>
    );
  }
}

export default BookDisplay;