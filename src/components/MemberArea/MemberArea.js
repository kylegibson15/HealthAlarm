import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, } from 'react-native';

// userAge: 0,
// firstName: '',
// lastName: '',
// username: '',
// email: '',
// password: '',
// biologicalSex: '-',
// Height: '',
// Weight: '-',
// StepCount: '-',
// DateOfBirth: '-',
// DistanceWalkingRunning: '-',
// FlightsClimbed: '-'

export default class MemberArea extends Component {

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.user}>Welcome Kyle!</Text>
          <Text style={styles.small}>Age: </Text>
          {/* <Text style={styles.sex}>Sex: {state.biologicalSex}</Text> */}
          <Text style={styles.small}>Yesterday Step Count: </Text>
        </View>
      </View>
    )
  }
}

var clock = require('../../assets/images/alarm-clock.png');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f39c12'
  },
  user: {
    fontSize: 50,
  },
  small: {
    fontSize: 20,
  }


})
