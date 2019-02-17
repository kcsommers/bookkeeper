import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { normalizeFont } from '../../assets/styles/appStyles';
import Environment from '../../environment';


class TrashButton extends React.Component {
  async _deleteItem() {
    const { endpoint, itemId } = this.props;
    const url = `${Environment.BASE_URL}/${endpoint}/${itemId}`;
    const deleteResults = await axios.delete(url);
    this.props.onDelete(deleteResults.data);
  }

  render() {
    return (
      <TouchableOpacity onPress={this._deleteItem}>
        <Icon
          name="trash"
          size={normalizeFont(this.props.size)}
          color={this.props.color}
        />
      </TouchableOpacity>
    );
  }
}

export default TrashButton;