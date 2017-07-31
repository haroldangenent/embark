import { View, StatusBar } from 'react-native';
import Queue from './components/Queue';
import React, { Component } from 'react';
import Stats from './components/Stats';
import styles from './styles';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: null,
    };
  }

  render() {
    return (
      <View style={styles.flex}>
        <StatusBar hidden={true} />

        <View style={styles.flex}>
          <Queue stats={this.state.stats} />
        </View>

        <Stats ref={(stats) => { !this.state.stats && this.setState({ stats }) }} />
      </View>
    );
  }
}
