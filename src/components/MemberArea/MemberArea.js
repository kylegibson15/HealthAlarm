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
    const props = this.props.state
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.user}>Welcome {props.first_name}!</Text>
          <Text style={styles.small}>Here are yesterdays totals</Text>
          <Text style={styles.small}>Age: {props.userAge}</Text>
          <Text style={styles.small}>Step Count: {props.StepCount} steps</Text>
          <Text style={styles.small}>Distance Walked/Run:  {props.DistanceWalkingRunning} miles</Text>
          <Text style={styles.small}>Flights Climbed: {props.FlightsClimbed} stories</Text>
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
    color: '#2c3e50',
    fontSize: 50,
  },
  small: {
    color: 'white',
    fontSize: 20,
  }


})
