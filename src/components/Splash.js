import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing
} from 'react-native';

export default class Splash extends Component {
  constructor() {
    super()
    this.spinValue = new Animated.Value(0)
  }
  componentDidMount() {
    setTimeout(() => {
      this.spin();
    }, 2000);

  }
  spin = () => {
    this.spinValue.setValue(0)
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 50,
      easing: Easing.inout
    }).start(() => this.spin())
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-10deg', '10deg']
    })
    return (<View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>HealthAlarm</Text>
        <Animated.Image style={{
            width: 60,
            height: 60,
            transform: [
              {
                rotate: spin
              }
            ]
          }} source={clock}/>
      </View>
      <View>
        <Text style={styles.subtitle}>built by Kyle Gibson</Text>
      </View>
    </View>)
  }
}

var clock = require('../assets/images/alarm-clock.png');
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#2c3e50',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 50
  },
  subtitle: {
    color: 'white',
    fontWeight: '200',
    padding: 10,
    marginBottom: 20
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clock: {
    height: 60,
    width: 60
  }
});
