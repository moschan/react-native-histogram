/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// import Histogram from './index.js'
import Histogram from '.react-native-histogram'

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} = React;

var HistogramExample = React.createClass({
  getInitialState: function() {
    return {
      data: [{}],
    }
  },
  componentWillMount: function() {
    this.set_random_param()
  },
  set_random_param: function() {
    var row_datas = [];
    for (var i=0; i<500; i++) {
      row_datas[i] = Math.random() * 100;
    }
    this.setState({
      data: [
        { data: row_datas }
      ]
    })
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Histogram Demo
        </Text>
        <View>
          <Histogram
            data={this.state.data}
            height={200}
            width={300}
            split={20}
            horizontal={false}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {this.set_random_param()}}
            >
            <Text
              style={styles.buttonText}
              >Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    flex:1,
    height: 30,
    marginTop: 30,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#007AFF',
    borderColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('HistogramExample', () => HistogramExample);
