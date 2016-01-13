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
    backgroundColor: 'rgb(0, 122, 255)',
    width: 15,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  onFocusBar: {
    borderWidth: 1,
    borderColor: '#62aeff',
    backgroundColor: '#62aeff',
  },
  labelText: {
    fontSize: 5,
    width: 15,
  },
  labelVertical: {
    // position: 'absolute',
  },
  graphScale: {
    flexDirection: 'row',
  }
});

module.exports = Style
