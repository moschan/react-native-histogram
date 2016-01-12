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
  onFocusBar: {
    borderWidth: 1,
    borderColor: '#62aeff',
    backgroundColor: '#62aeff',
  },
  labelText: {
    fontSize: 8,
  }
});

module.exports = Style
