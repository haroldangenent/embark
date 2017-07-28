import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: {},
    }
  }

  approve(breed) {
    this.setStats(breed, 1);
  }

  reject(breed) {
    this.setStats(breed, -1);
  }

  setStats(breed, delta) {
    const newStats = this.state.stats;
    newStats[breed] = !newStats[breed] ? delta : newStats[breed] + delta;

    this.setState({ stats: newStats });
  }

  render() {
    return (
      <View style={[styles.stats]}>
        <Text style={styles.heading}>Your top 🐕🐕🐕</Text>

        {this.renderList()}
      </View>
    );
  }

  renderList() {
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
