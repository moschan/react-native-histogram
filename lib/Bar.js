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
      barScale: new Animated.Value(1),
      onFocusBar: false,
    }
  }
  componentDidMount() {
  }
  _onTouchStart() {
    Animated.spring(
      this.state.barScale,
      {
        toValue: 1.3,
        friction: 10,
      }
    ).start();
    this.setState({onFocusBar: true})
  }
  _onRelease() {
    Animated.spring(
      this.state.barScale,
      {
        toValue: 1,
        friction: 10,
      }
    ).start();
    this.setState({onFocusBar: false})
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
          this.state.onFocusBar && Style.onFocusBar,
          {
            height: this.props.value,
            transform: [
              {scaleY: this.state.barScale},
            ],
          }
        ]}
        ></Animated.View>
    </TouchableWithoutFeedback>
    )
  }
}

Bar.defaultProps = {
  value: 0,
}
