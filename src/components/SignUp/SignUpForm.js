import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class SignUpForm extends Component {

  giveMeLogs() {
    let data = {
      first_name: this.firstNameInputValue,
      last_name: this.lastNameInputValue,
      email: this.emailInputValue,
      username: this.usernameInputValue,
      password: this.passwordInputValue
    }
    this.props.newUserInfo(data)
    Actions.login()
  }

  render() {
    return (<View style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <TextInput name="first_name" placeholder="first name" placeholderTextColor="white" returnKeyType="next" ref={(input) => this.firstNameInput = input} onChangeText={(first_name) => this.firstNameInputValue = first_name} onSubmitEditing={() => this.lastNameInput.focus()} autoCapitolize={false} style={styles.input}/>

      <TextInput name="last_name" placeholder="last name" placeholderTextColor="white" returnKeyType="next" ref={(input) => this.lastNameInput = input} onChangeText={(last_name) => this.lastNameInputValue = last_name} onSubmitEditing={() => this.emailInput.focus()} autoCapitolize={false} style={styles.input}/>

      <TextInput name="email" placeholder="email" placeholderTextColor="white" returnKeyType="next" keyboardType="email-address" ref={(input) => this.emailInput = input} onChangeText={(email) => this.emailInputValue = email} onSubmitEditing={() => this.usernameInput.focus()} autoCapitolize={false} style={styles.input}/>

      <TextInput name="username" placeholder="username" placeholderTextColor="white" returnKeyType="next" ref={(input) => this.usernameInput = input} onChangeText={(username) => this.usernameInputValue = username} onSubmitEditing={() => this.passwordInput.focus()} autoCapitolize={false} style={styles.input}/>

      <TextInput name="password" secureTextEntry="secureTextEntry" placeholder="password" placeholderTextColor="white" returnKeyType="go" onChangeText={(password) => this.passwordInputValue = password} ref={(input) => this.passwordInput = input} autoCapitolize={false} style={styles.input}/>

      <TouchableOpacity onPress="onPress" {() => this.giveMeLogs()} style={styles.buttonContiainer}>
        <Text style={styles.buttonText}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f39c12'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContiainer: {
    backgroundColor: '#2c3e50',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
})
