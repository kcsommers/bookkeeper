import React from 'react';

class Redirect extends React.Component {
  componentWillMount() {
    const { path, params, navigation } = this.props;
    navigation.navigate(path, params);
    console.log('REDIRECTING');
  }

  render() {
    return null;
  }
}

export default Redirect;