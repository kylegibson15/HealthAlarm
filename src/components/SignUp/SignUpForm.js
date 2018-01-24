import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default class SignUpForm extends Component {

  handleSignUpEvent = (event) => {
    event.preventDefault();
    console.log('handleSignUp')
  }

  render() {
    const { navigate } = this.props.navigation;
    return (<View style={styles.container}>
      <StatusBar
      barStyle="dark-content"
    />
      <TextInput
        placeholder="first name"
        placeholderTextColor="white"
        returnKeyType="next"
        ref={(input) => this.firstNameInput = input}
        onChangeText={(firstName) => this.firstNameInputValue = firstName}
        onSubmitEditing={() => this.lastNameInput.focus()}
        autoCapitolize={false}
        style={styles.input}
      />

      <TextInput
        placeholder="last name"
        placeholderTextColor="white"
        returnKeyType="next"
        ref={(input) => this.lastNameInput = input}
        onChangeText={(lastName) => this.lastNameInputValue = lastName}
        onSubmitEditing={() => this.emailInput.focus()}
        autoCapitolize={false}
        style={styles.input}
      />

      <TextInput
        placeholder="email"
        placeholderTextColor="white"
        returnKeyType="next"
        keyboardType="email-address"
        ref={(input) => this.emailInput = input}
        onChangeText={(email) => this.emailInputValue = email}
        onSubmitEditing={() => this.usernameInput.focus()}
        autoCapitolize={false}
        style={styles.input}
      />

      <TextInput
        placeholder="username"
        placeholderTextColor="white"
        returnKeyType="next"
        ref={(input) => this.usernameInput = input}
        onChangeText={(userame) => this.usernameInputValue = userame}
        onSubmitEditing={() => this.passwordInput.focus()}
        autoCapitolize={false}
        style={styles.input}
      />

      <TextInput
        secureTextEntry
        placeholder="password"
        placeholderTextColor="white"
        returnKeyType="go"
        ref={(input) => this.passwordInput = input}
        autoCapitolize={false}
        style={styles.input}
      />

      <TouchableOpacity onPress = {() => this.handleSignUpEvent} onPress = {() => navigate('Login', {screen: 'Login'})} style={styles.buttonContiainer}>
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
    backgroundColor: '#f39c12',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  buttonContiainer:{
    backgroundColor: '#2c3e50',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  }
})
