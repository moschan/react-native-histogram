'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React;

var Style = StyleSheet.create({
  graph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
  },
  bar: {
    width: 15,
  },
  barText: {
    fontSize: 7,
    textAlign: 'center',
    color: '#fff',
    padding: 2,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: 5,
    // width: 15,
  },
  labelTextHorizontal: {
    fontSize: 5,
    width: 15,
  },
  graphScale: {
    flexDirection: 'row',
  },
  scaleVertical: {
    position: 'absolute',
    flex:1,
    flexDirection: 'row',
  },
  scaleLine: {
    height: .2,
    position: 'absolute',
    top: 2.5,
    left: 5,
    width: 300,
    backgroundColor: 'rgba(0,0,0,.2)',
  }

});

module.exports = Style
