import React from 'react'
import App from './App';
import { Provider } from 'react-redux'
import { Font } from 'expo'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Merriweather': require('./assets/fonts/Merriweather-Regular.ttf'),
      'MerrItalic': require('./assets/fonts/Merriweather-Italic.ttf'),
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    return (this.state.fontsLoaded) ? (<App />) : null
  }
}

export default Index;