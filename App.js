import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Splash from './src/components/Splash';
import Login from './src/components/Login/Login';
import SignUp from './src/components/SignUp/SignUp';
import MemberArea from './src/components/MemberArea/MemberArea';
import {Router, Scene} from 'react-native-router-flux';


export default class App extends Component < {} > {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false
    }
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 3000);
  }
  setTimePassed() {
    this.setState({timePassed: true});
  }
  login = (username, password) => {
    this.setState({username: 'username', password: 'password'});

    alert(username + " " + password)
  }

  render() {

    if (!this.state.timePassed) {
      return <Splash/>;
    } else {
      return <Router>

        <Scene key="root">
          <Scene hideNavBar key="login" component={Login} title="Login" initial="initial"/>

          <Scene hideNavBar key="signup" component={SignUp} title="SignUp"/>

          <Scene key="memberarea" component={MemberArea} title="MemberArea"/>
        </Scene>
      </Router>;
    }
  }
}
