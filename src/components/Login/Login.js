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

    this.newUserInfo = this.newUserInfo.bind(this)
  }
  newUserInfo(data) {
    this.setState({first_name: data.first_name, last_name: data.last_name, email: data.email, username: data.username, password: data.password});
    this.getHealthData()
    this.createAccount(this.state)
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
                  });
                });
              });
            });
          });
        })
      });

    });
  }

  async createAccount(new_user) {
    var url = `'http://localhost:3000/new'`
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: new_user})
    });
  //   axios.post('/user', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  }

  render() {
    console.log('line 152 LOGIN PAGE: ', this.state);
    return (<KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>HealthAlarm</Text>
        <Image style={styles.clock} source={smiley}/>
        <Text style={styles.description}>waking up with a smile on</Text>
      </View>
      <View>
        <Text style={styles.signUp} onPress={() => Actions.signup({newUserInfo: this.newUserInfo})}>
          {/* , getHealthData: this.getHealthData */}
          Don't have an account? Sign up here
        </Text>
        <LoginForm state={this.state}/>
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
