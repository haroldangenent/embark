import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Dog from './components/Dog';
import React, { Component } from 'react';
import Stats from './components/Stats';

export default class App extends Component {
  constructor() {
    super();

    this.breeds = [];

    this.state = {
      breed: null,
      stats: {},
    }
  }

  componentDidMount() {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((response) => response.message)
      .then((breeds) => {
        this.breeds = Object.keys(breeds);
        this.next();
      });
  }

  approve() {
    this.setStats(this.state.breed, 1);
    this.next();
  }

  reject() {
    this.setStats(this.state.breed, -1);
    this.next();
  }

  next() {
    this.setState({ breed: this.getRandomBreed() })
  }

  getRandomBreed() {
    return this.breeds[Math.floor(Math.random() * this.breeds.length)];
  }

  setStats(breed, delta) {
    const newStats = this.state.stats;
    newStats[this.state.breed] = !newStats[this.state.breed] ? delta : newStats[this.state.breed] + delta;

    this.setState({ stats: newStats });
  }

  render() {
    if (!this.state.breed) {
      return null;
    }

    return (
      <View style={styles.flex}>
        <StatusBar hidden={true} />

        <View style={styles.flex}>
          <Dog key={this.state.breed} breed={this.state.breed} onApprove={() => this.approve()} onReject={() => this.reject()} />
        </View>

        <Stats stats={this.state.stats} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
