import React from 'react';
import {
  View,
  Text
} from 'react-native';
import Moment from 'react-moment';
import { appSpacing, appColors, normalizeFont } from '../../assets/styles/appStyles.styles';

class MomentDisplay extends React.Component {
  render() {
    const { time } = this.props;
    return (
      <View style={[{
        paddingBottom: appSpacing.sm.y,
        marginBottom: appSpacing.md.y,
        borderBottomColor: appColors.gray,
        borderBottomWidth: 1
      }]}
      >
        <Text>
          added
          {' '}
          <Moment
            element={Text}
            fromNowDuring={2.628e+9}
            style={{ fontSize: normalizeFont(12) }}
          >
            {time}
          </Moment>
        </Text>
      </View>
    );
  }
}

export default MomentDisplay;