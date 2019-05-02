import { createStackNavigator } from 'react-navigation';
import SearchScreen from '../../../screens/Search.screen';
import { appColors } from '../../../../assets/styles/appStyles.styles';

// In HomeTab
const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: appColors.teal,
      },
    }
  }
);

export default SearchStack;