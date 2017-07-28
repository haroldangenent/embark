import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Dog from './components/Dog';
import React, { Component } from 'react';
import Stats from './components/Stats';
import styles from './styles';

export default class App extends Component {
  constructor() {
    super();

    this.breeds = [];

    this.state = {
      breed: null,
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

  next() {
    this.setState({ breed: this.getRandomBreed() })
  }

  getRandomBreed() {
    return this.breeds[Math.floor(Math.random() * this.breeds.length)];
  }

  render() {
    if (!this.state.breed) {
      return null;
    }

    return (
      <View style={styles.flex}>
        <StatusBar hidden={true} />

        <View style={styles.flex}>
          <Dog
            key={this.state.breed}
            breed={this.state.breed}
            onApprove={() => {
              this.refs.stats.approve(this.state.breed);
              this.next();
            }}
            onReject={() => {
              this.refs.stats.reject(this.state.breed);
              this.next();
            }}
          />
        </View>

        <Stats ref="stats" />
      </View>
    );
  }
}
