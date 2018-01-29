import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, Image, Button, KeyboardAvoidingView} from 'react-native';
import Dialogflow from 'react-native-dialogflow';


export default class MemberArea extends Component {
  constructor(props) {
    super(props);

    Dialogflow.setConfiguration("045755868f3b48d982ae7c7c7c315b68", Dialogflow.LANG_ENGLISH_GB);
  }

  twoDecimalPlacesSteps() {
    const props = this.props.state
    let stepCount = Number(props.StepCount).toFixed(2)
    return stepCount;
  }

  twoDecimalPlacesDistanceWalkingRunning() {
    const props = this.props.state
    let distance = Number(props.DistanceWalkingRunning).toFixed(2)
    return distance;
  }

  render() {
    const props = this.props.state
    return (<ScrollView style={styles.container}>
      <View style={styles.userInfo}>

        <View style={styles.firstLastContainer}>
          <Text style={styles.user}>{props.first_name}
            {props.last_name}</Text>
          <Text style={styles.age}>Age: {props.userAge}</Text>
        </View>

        <View style={styles.totalsContainer}>
          <Text style={styles.totals}>Yesterdays Totals</Text>
        </View>

        <View style={styles.infoCards}>

          <View style={styles.imageContainer}>
            <Image style={styles.images} source={step}/>
          </View>

          <View style={styles.stepTextContainer}>
            <Text style={styles.small}>{this.twoDecimalPlacesSteps()}</Text>
            <Text style={styles.smaller}>Steps</Text>
          </View>
        </View>

        <View style={styles.infoCards}>

          <View style={styles.imageContainer}>
            <Image style={styles.images} source={runner}/>
          </View>

          <View style={styles.distanceWalkRunContainer}>
            <Text style={styles.small}>
              {this.twoDecimalPlacesDistanceWalkingRunning()}
              <Text style={styles.smaller}>miles</Text>
            </Text>
            <Text style={styles.smaller}>Distance Walk/Run</Text>
          </View>
        </View>

        <View style={styles.infoCards}>
          <View style={styles.imageContainer}>
            <Image style={styles.images} source={stairs}/>
          </View>
          <View style={styles.flightsClimbedContainer}>
            <Text style={styles.small}>{props.FlightsClimbed}
              <Text style={styles.smaller}>stories</Text>
            </Text>
            <Text style={styles.smaller}>Flights Climbed</Text>
          </View>
        </View>

        {/* <Button title="Google Assistant" onPress={() => {
            Dialogflow.startListening(result => {
              console.log(result);
            }, error => {
              console.log(error);
            });
          }}/> */}

      </View>
    </ScrollView>)
  }
}

var clock = require('../../assets/images/alarm-clock.png');
var runner = require('../../assets/images/runner.png');
var stairs = require('../../assets/images/stairs.png');
var step = require('../../assets/images/step-heart.png');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50'
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    marginBottom: 10
  },
  clock: {
    height: 40,
    width: 40
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10
  },
  firstLastContainer: {
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalsContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  totals: {
    color: '#f39c12',
    fontSize: 25
  },
  user: {
    color: '#f39c12',
    fontSize: 50
  },
  age: {
    color: 'white',
    fontSize: 20
  },
  small: {
    color: 'white',
    fontSize: 20
  },
  smaller: {
    color: 'white',
    fontSize: 13
  },
  infoCards: {
    margin: 10,
    borderWidth: .5,
    borderColor: '#f39c12',
    backgroundColor: 'rgba(243, 156, 18, 0.1)',
    borderRadius: 5,
    padding: .5,
  },
  imageContainer: {
    alignItems: 'center'
  },
  images: {
    height: 55,
    width: 55,
  },
  stepTextContainer: {
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  distanceWalkRunContainer: {
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  flightsClimbedContainer: {
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  buttonContainer: {
    backgroundColor: '#2c3e50',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }

})
