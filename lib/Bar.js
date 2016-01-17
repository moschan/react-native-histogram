'use strict';

import Style from './Style'

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Animated,
  TouchableWithoutFeedback,
} = React;

export default class Bar extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      color: new Animated.Value(0),
      onFocusBar: false,
    }
  }
  componentDidMount() {
  }
  _onTouchStart() {
    Animated.timing(this.state.color, {
      toValue: 1,
      duration: 180,
    }).start()
  }
  _onRelease() {
    Animated.timing(this.state.color, {
      toValue: 0,
      duration: 180,
    }).start()
  }
  render() {
    LayoutAnimation.spring();
    return (
      <TouchableWithoutFeedback
        onPressIn={this._onTouchStart.bind(this)}
        onPressOut={this._onRelease.bind(this)}
        >
        <Animated.View style={[
          Style.bar,
          {
            backgroundColor: this.state.color.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgb(0, 122, 255)', '#62aeff']
            }),
            width: this.props.width,
          },
          {
            height: this.props.value,
          }
        ]}
        >
        <Text style={Style.barText}>{parseInt(this.props.value/this.props.magnification)}</Text>
        </Animated.View>
    </TouchableWithoutFeedback>
    )
  }
}

Bar.defaultProps = {
  value: 0,
}
