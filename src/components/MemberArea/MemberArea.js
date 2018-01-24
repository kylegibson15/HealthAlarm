import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, } from 'react-native';

export default class MemberArea extends Component {

  render() {
    const user = this.props.navigation.state.params.user;
    const state = this.props.navigation.state.params.props.state
    console.log(this.props.navigation.state.params.props.state)
    return (
      <View style={styles.container}>
        <Text style={styles.user}>
          Welcome {user}!
          Age: {state.userAge}
          Sex: {state.biologicalSex}
          Current Step Count: {state.StepCount}

        </Text>
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
  }


})
