import { createStackNavigator } from 'react-navigation';
import NotepadScreen from '../screens/NotepadScreen';
import CurrentReadsScreen from '../screens/CurrentReadsScreen';

const BookStack = createStackNavigator(
  {
    Book: {
      screen: CurrentReadsScreen,
      navigationOptions: {
        header: null
      }
    },
    Notepad: {
      screen: NotepadScreen
    }
  }
);

export default BookStack;