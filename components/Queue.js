import { View } from 'react-native';
import Dog from './Dog';
import React, { Component } from 'react';
import styles from '../styles'

export default class Queue extends Component {
  constructor(props) {
    super(props);

    this.breeds = [];
    this.length = 3;
    this.state = {
      queue: [],
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
    const queue = this.state.queue;

    if (queue.length) {
      queue.shift();
    }

    while(queue.length < this.length) {
      queue.push(this.getRandomBreed());
    }

    this.setState({ queue });
  }

  getRandomBreed() {
    return this.breeds[Math.floor(Math.random() * this.breeds.length)];
  }

  render() {
    if (!this.state.queue.length) {
      return null;
    }

    return (
      <View style={styles.flex}>
        {this.renderQueue()}
      </View>
    );
  }

  renderQueue() {
    return this.state.queue.map((breed, key) => {
      return (
        <Dog
          key={breed}
          breed={breed}
          zIndex={(this.state.queue.length - key)}
          onApprove={() => {
            this.props.stats.approve(breed);
            this.next();
          }}
          onReject={() => {
            this.props.stats.reject(breed);
            this.next();
          }}
        />
      );
    });
  }
}
