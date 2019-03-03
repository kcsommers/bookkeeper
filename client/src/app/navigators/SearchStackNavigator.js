import { createStackNavigator } from 'react-navigation';
import SearchScreen from '../screens/SearchScreen';

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