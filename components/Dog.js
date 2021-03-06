import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import styles from '../styles';

export default class Dog extends Component {
  constructor(props) {
    super(props);

    this.minimumDrag = 120;

    this.state = {
      image: null,
      start: 0,
      swipe: 0,
    };
  }

  componentDidMount() {
    fetch(`https://dog.ceo/api/breed/${this.props.breed}/images/random`)
      .then((response) => response.json())
      .then((response) => response.message)
      .then((image) => this.setState({ image }));
  }

  startDrag(event) {
    this.setState({ start: event.nativeEvent.pageX });

    return true;
  }

  drag(event) {
    this.setState({ swipe: event.nativeEvent.pageX - this.state.start });
  }

  endDrag() {
    if (this.state.swipe > this.minimumDrag) {
      this.props.onApprove();
    } else if (this.state.swipe < -this.minimumDrag) {
      this.props.onReject();
    }

    this.setState({ start: 0, swipe: 0 });
  }

  render() {
    if (!this.state.image) {
      return null;
    }

    return (
      <View
        style={[styles.flex, {
          bottom: 0,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          transform: [
            { translateX: this.state.swipe },
          ],
          zIndex: this.props.zIndex,
        }]}
        onResponderMove={(event) => this.drag(event)}
        onStartShouldSetResponder={(event) => this.startDrag(event)}
        onResponderRelease={() => this.endDrag()}
      >
        <Image source={{uri: this.state.image}} style={[styles.flex, componentStyles.image]} />
      </View>
    );
  }  
}

const componentStyles = StyleSheet.create({
  image: {
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
});
