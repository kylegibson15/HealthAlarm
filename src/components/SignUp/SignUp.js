import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, } from 'react-native';
import SignUpForm from './SignUpForm';

export default class SignUp extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>HealthAlarm</Text>
          <Image style={styles.clock} source={clock}/>
        </View>
        <View style={styles.signUpForm}>
          <SignUpForm state={this.props} newUserInfo={this.props.newUserInfo} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

var clock = require('../../assets/images/alarm-clock.png');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  clock: {
    height: 60,
    width: 60,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  },
  signUpForm: {
    // marginTop: 90,
  }
})
