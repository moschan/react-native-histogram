'use strict';

import Style from './Style'
import Bar from './Bar.js'

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

export default class Histogram extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      height: 300,
      width: 300,
      horizontal: false,
    }
  }
  componentDidMount() {
    var formated_data = this._dataFormatter(this.props.data)
    var categorized_data = this._dataCategorizer(formated_data)
    // console.log(categorized_data)
    // var categorized_data = formated_data
    this.setState({data:categorized_data})
  }
  componentWillReceiveProps(NextProps) {
    var formated_data = this._dataFormatter(NextProps.data)
    var categorized_data = this._dataCategorizer(formated_data)
    // console.log(categorized_data)
    // var categorized_data = formated_data
    console.log(categorized_data)
    this.setState({data:categorized_data})
  }
  _dataFormatter(datas) {
    return datas.map((val)=>{
      var max = Math.max(...val.data)
      var magnification = 100 / max
      var digit = max.toString(10).length
      val.data = val.data.map((val)=>{

        return parseInt(val * magnification)
      })
      val.data.sort((a,b) => a-b)
      return val
    })
  }
  _dataCategorizer(datas) {
    return datas.map((val)=>{
      val.data.sort()
      var categorized_data = []
      var threshold_data = []
      var _data = []
      var max = Math.max(...val.data)
      var min = Math.min(...val.data)
      var interval = (max - min) / 20
      var threshold = min + interval;
      for (var i=0; i<val.data.length; i++) {
        if (val.data[i] < threshold) {
          categorized_data[categorized_data.length-1] += 1
        } else {
          threshold += interval;
          threshold_data.push(threshold)
          categorized_data.push(0)
        }
      }
      val.data = categorized_data
      val.value = threshold_data
      return val
    })
  }
  _renderHistogram(graph) {
    return graph.data.map((value, index)=>{
      return (
        <View>
          <Bar value={value} />
        </View>
      )
    })
  }
  render() {
    return (
      <View style={Style.graph}>
        {this.props.data.map(this._renderHistogram)}
      </View>
    )
  }
}

Histogram.defaultProps = {
  data: [],
  height: 300,
  width: 300,
  horizontal: false,
}

