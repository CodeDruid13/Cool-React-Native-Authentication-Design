import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppLoading, Asset } from 'expo';

import Navigation from './navigation';
import { Block } from './components';

// import all used images
const images = [ 
  require('./assets/images/img1.png'),
  require('./assets/images/img2.png'),
  require('./assets/images/img3.png'),
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
      <Block white>
        <Navigation />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
});