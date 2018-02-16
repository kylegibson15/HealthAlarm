import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';
import SignUp from '../SignUp/SignUp';
import MemberArea from '../MemberArea/MemberArea';
import AppleHealthKit, {
  getBiologicalSex,
  getDateOfBirth,
  getStepCount,
  getLatestWeight,
  getDistanceWalkingRunning,
  getFlightsClimbed,
  getLatestHeight
} from 'rn-apple-healthkit';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAge: 0,
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      biologicalSex: '-',
      Height: '',
      Weight: '-',
      StepCount: '-',
      DateOfBirth: '-',
      DistanceWalkingRunning: '-',
      FlightsClimbed: '-'
    }
    this.newUserInfo = this.newUserInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  newUserInfo(data) {
    this.setState({first_name: data.first_name, last_name: data.last_name, email: data.email, username: data.username, password: data.password});
    this.getHealthData();
  }

  getUserInfo(data) {
    axios.post('https://health-alarm-db.herokuapp.com/login', {data: data}).then((response) => {
      this.setState({
        first_name: response.data[0].first_name,
        last_name: response.data[0].last_name,
        email: response.data[0].email,
        username: response.data[0].username,
        password: response.data[0].password,
        biologicalSex: response.data[0].biologicalSex,
        Height: response.data[0].Height,
        Weight: response.data[0].Weight,
        StepCount: response.data[0].StepCount,
        DateOfBirth: response.data[0].DateOfBirth,
        DistanceWalkingRunning: response.data[0].DistanceWalkingRunning,
        FlightsClimbed: response.data[0].FlightsClimbed,
        userAge: response.data[0].userAge
      });
      Actions.memberarea({state: this.state})
    }).catch((err) => {
      console.log(err, 'user not logged in, try again');
    });
  }

  getYesterdaysDate() {
    let iso = new Date().toISOString()
    let split = iso.split('')
    let indexEight = split[8]
    let indexNine = split[9]
    let day = indexEight + indexNine
    let yest = Number(day) - 1
    yest = yest.toString()
    if (yest.length < 2) {
      yest = ('0' + (
      Number(day) - 1))
    }
    split.splice(8, 2, yest)
    return split.join('');
  }

  getHealthData() {
    let options = {
      permissions: {
        read: [
          "Height",
          "Weight",
          "StepCount",
          "DateOfBirth",
          "SleepAnalysis",
          "BiologicalSex",
          "DistanceWalkingRunning",
          "FlightsClimbed"
        ]
      }
    };
    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log("error initializing Healthkit: ", err);
        return;
      }
      getDateOfBirth(null, (err, results) => {
        this.setState({userAge: results.age, DateOfBirth: results.value})
        getBiologicalSex(null, (err, results) => {
          this.setState({biologicalSex: results.value})

          let options = {
            unit: 'pound'
          };

          getLatestWeight(options, (err, results) => {
            this.setState({Weight: results.value})

            let options = {
              date: this.getYesterdaysDate()
            };

            getStepCount(options, (err, results) => {
              this.setState({StepCount: results.value})

              let options = {
                unit: 'mile',
                date: this.getYesterdaysDate()
              };

              getDistanceWalkingRunning(options, (err, results) => {
                this.setState({DistanceWalkingRunning: results.value})

                let options = {
                  date: this.getYesterdaysDate()
                };

                getFlightsClimbed(options, (err, results) => {
                  this.setState({FlightsClimbed: results.value})

                  getLatestHeight(null, (err, results) => {
                    this.setState({Height: results.value})
                    this.createAccount(this.state);
                  });
                });
              });
            });
          });
        })
      });

    });
  }

  createAccount(info) {
    axios.post('https://health-alarm-db.herokuapp.com/new', {data: info}).then(response => {
      console.log(response, 'user added!');
    }).catch(err => {
      console.log(err, 'user not added, try again');
    });
  }

  render() {
    return (<KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>HealthAlarm</Text>
        <Image style={styles.clock} source={smiley}/>
        <Text style={styles.description}>waking up with a smile on</Text>
      </View>
      <View>
        <Text style={styles.signUp} onPress={() => Actions.signup({newUserInfo: this.newUserInfo})}>
          Don't have an account? Sign up here
        </Text>
        <LoginForm state={this.state} getUserInfo={this.getUserInfo}/>
      </View>
    </KeyboardAvoidingView>)
  }
}

var clock = require('../../assets/images/alarm-clock.png');
var smiley = require('../../assets/images/sunglasses.png');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    color: '#2c3e50',
    fontSize: 50
  },
  description: {
    color: '#2c3e50',
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.9
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  signUp: {
    alignSelf: 'center',
    color: '#2c3e50'
  },
  clock: {
    height: 60,
    width: 60
  }

})
