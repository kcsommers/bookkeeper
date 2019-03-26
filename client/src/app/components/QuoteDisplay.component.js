import React from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';
import MomentDisplay from './MomentDisplay.component';
import { appStyles, appSpacing, appColors } from '../../assets/styles/appStyles.styles';

class QuoteDisplay extends React.Component {
  render() {
    const { quote } = this.props;
    return (
      <TouchableOpacity style={[appStyles.boxShadow, appStyles.paddingMd, {
        marginBottom: appSpacing.lg.y,
        backgroundColor: appColors.white
      }]}
      >
        <MomentDisplay time={quote.createdAt} />
        <Text style={[appStyles.noteText]}>{quote.content}</Text>
      </TouchableOpacity>
    );
  }
}

export default QuoteDisplay;