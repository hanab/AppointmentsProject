'use strict';

// mostly taken from  https://github.com/uken/react-countdown-timer
// with modificatio to the render and formmating functons


import React, {
  StyleSheet,
  View,
  Text
} from 'react-native';


var CountdownTimer = React.createClass({
  displayName: 'CountdownTimer',

  propTypes: {
    initialTimeRemaining: React.PropTypes.number.isRequired,
    interval: React.PropTypes.number,
    formatFunc: React.PropTypes.func,
    tickCallback: React.PropTypes.func,
    completeCallback: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      interval: 1000,
      formatFunc: null,
      tickCallback: null,
      completeCallback: null
    };
  },

  getInitialState: function() {
    // Normally an anti-pattern to use this.props in getInitialState,
    // but these are all initializations (not an anti-pattern).
    return {
      timeRemaining: this.props.initialTimeRemaining,
      timeoutId: null,
      prevTime: null
    };
  },

  componentDidMount: function() {
    this.tick();
  },

  componentWillReceiveProps: function(newProps) {
    if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
    this.setState({prevTime: null, timeRemaining: newProps.initialTimeRemaining});
  },

  componentDidUpdate: function() {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.isMounted()) {
      this.tick();
    }
  },

  componentWillUnmount: function() {
    clearTimeout(this.state.timeoutId);
  },

  tick: function() {
    var currentTime = Date.now();
    var dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
    var interval = this.props.interval;

    // correct for small variations in actual timeout time
    var timeRemainingInInterval = (interval - (dt % interval));
    var timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval;
    }

    var timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    var countdownComplete = (this.state.prevTime && timeRemaining <= 0);

    if (this.isMounted()) {
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
      this.setState({
        timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
        prevTime: currentTime,
        timeRemaining: timeRemaining
      });
    }

    if (countdownComplete) {
      if (this.props.completeCallback) { this.props.completeCallback(); }
      return;
    }

    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining);
    }
  },

  getFormattedTime: function(milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds);
    }

    var totalSeconds = Math.round(milliseconds / 1000);

    var seconds = parseInt(totalSeconds % 60, 10);
    var minutes = parseInt(totalSeconds / 60, 10) % 60;
    var hours = parseInt(totalSeconds / 3600, 10)%24;
    var days =  parseInt(totalSeconds /(3600*24), 10);  

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    days = days < 10 ? '0'  + days : days;

    return { 'days' : days ,
               'hours' : hours,
                'minutes' : minutes ,
                 'seconds' : seconds

           };
  },

  render: function() {
    var timeRemaining = this.state.timeRemaining;

    return (
        <View style={styles.Container}>
        <View style={styles.daysContainer}>
       <Text style={styles.text1}> {this.getFormattedTime(timeRemaining).days} </Text>
       <Text style={styles.text1}> Days </Text>
       </View>
       <View style={styles.daysContainer}>
       <Text style={styles.text1}> {this.getFormattedTime(timeRemaining).hours} </Text>
       <Text style={styles.text1}> Hours </Text>
       </View>
        <View style={styles.daysContainer}>
       <Text style={styles.text1}> {this.getFormattedTime(timeRemaining).minutes} </Text>
       <Text style={styles.text1}> Minutes </Text>
       </View>
      </View>
      
    );
  }

});

const styles = StyleSheet.create({
Container : {
//flex: 1,
flexDirection:'row', 
backgroundColor:'#26BCD7',
alignItems:'center',
width: 108,
borderRadius: 3,
},

daysContainer: {
    flex: 1,
   alignItems: 'center',
  flexDirection: 'column',
  //justifyContent:'center',
},

text1: {
//flex:1,
//alignItems: 'center',
fontSize: 8,

}


});

module.exports = CountdownTimer;