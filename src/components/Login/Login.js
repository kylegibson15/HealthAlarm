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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAge: 0,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      biologicalSex: '-',
      Height: '',
      Weight: '-',
      StepCount: '-',
      DateOfBirth: '-',
      StepCount: '-',
      DistanceWalkingRunning: '-',
      FlightsClimbed: '',
    }
  }
  // componentWillMount() {
  //   var url = `'http://localhost:3000/test'`
  //   return fetch(url)
  //   .then((data) => {
  //     console.log(data.json())
  //   })
  // .then((res) => {

  // this.setState({user: res})
  // })
  //   .catch(err => {
  //   res.status(500).json(err)
  // });
  // }
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

  componentDidMount() {
    let options = {
      permissions: {
        read: [
          "Height",
          "Weight",
          "StepCount",
          "DateOfBirth",
          "StepCount",
          "SleepAnalysis",
          "BiologicalSex",
          "DistanceWalkingRunning",
          "FlightsClimbed",
          "ActiveEnergyBurned"
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

  render() {
    const {navigate} = this.props.navigation;
    return (<KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>HealthAlarm</Text>
        <Image style={styles.clock} source={smiley}/>
        <Text style={styles.description}>waking up with a smile on</Text>
      </View>
      <View>
        <Text style={styles.signUp} onPress={() => navigate('SignUp', {
            screen: 'SignUp',
            state: this.state
          })}>

          Don't have an account? Sign up here
        </Text>
        <LoginForm navigation={this.props.navigation} state={this.state}/>
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
