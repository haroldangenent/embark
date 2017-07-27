import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Dog from './components/Dog';
import React, { Component } from 'react';

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
        <View style={[styles.flex, styles.stats]}>
          <Text style={styles.heading}>Your top 🐕🐕🐕</Text>

          {this.renderStats()}
        </View>
      </View>
    );
  }

  renderStats() {
    if (!Object.keys(this.state.stats).length) {
      return <Text>Swipe right to approve, left to decline</Text>
    }

    const orderedStats = Object.keys(this.state.stats)
      .map((breed) => {
        return {
          name: breed,
          count: this.state.stats[breed],
        };
      })
      .sort((a, b) => {
        return b.count - a.count;
      })
      .splice(0, 3);

    return orderedStats.map((breed, key) => {
      return <Text style={styles.list} key={key}>{(key + 1)}. {breed.name.charAt(0).toUpperCase() + breed.name.slice(1)} ({breed.count})</Text>;
    });
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    fontSize: 16,
    marginBottom: 10,
  },
  stats: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    flex: 0.5,
    height: 100,
    padding: 20,
  },
});
