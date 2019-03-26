import { createStackNavigator } from 'react-navigation';
import SearchScreen from '../../../screens/Search.screen';

// In HomeTab
const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default SearchStack;