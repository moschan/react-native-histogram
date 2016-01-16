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
      render_data: [],
      verticalScales: [],
      horizontalScales: [],
      height: 300,
      width: 300,
      horizontal: false,
    }
  }
  componentDidMount() {
    this._initGraph(this.props)
  }
  componentWillReceiveProps(NextProps) {
    this._initGraph(NextProps)
  }
  _initGraph(props) {
    this.setState({
      horizontalScales: this._getHorizontalScales(props.data),
    })


    var data = clone(props.data);
    var sorted_data = data.sort((a,b) => a-b)
    var categorized_data = this._dataCategorizer(sorted_data)

    var formated_data = this._dataFormatter(props.data)
    console.log(formated_data)
    var formated_sorted_data = formated_data.sort((a,b) => a-b)
    // console.log(formated_sorted_data)
    var render_data = this._dataCategorizer(formated_sorted_data)

    this.setState({
      data: categorized_data,
      render_data: render_data,
      verticalScales: this._getVericalScales(categorized_data),
    })
  }
  _dataFormatter(datas) {
    return datas.map((val)=>{
      var formated_data = val
      var max = Math.max(...val.data)
      var magnification = 100 / max
      // var digit = max.toString(10).length
      // console.log(this.props.data)
      formated_data.data = formated_data.data.map((val)=>{
        return parseInt(val * magnification)
      })
      return formated_data
    })

  }
  _dataCategorizer(datas) {
    return datas.map((val)=>{
      var categorized_data = []
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
          categorized_data.push(0)
        }
      }
      val.data = categorized_data
      return val
    })
  }
  _getVericalScales(datas) {
    var memories = []
    var max = Math.max(...datas.map((data) => {return Math.max(...data.data)}))
    var interval = max / 5
    var threshold = max;
    for (var i=5; i>-1; i--) {
      memories.push(parseInt(threshold))
      threshold -= interval
    }
    return memories
  }
  _getHorizontalScales(datas) {
    var memories = []
    var max = Math.max(...datas.map((data) => {return Math.max(...data.data)}))
    // console.log('--------------------')
    // console.log(datas)
    var interval = max / 20
    var threshold = 0;
    for (var i=0; i<20; i++) {
      memories.push(Math.round( threshold * 100 ) / 100)
      threshold += interval
    }
    return memories
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
  _renderVerticalScales(value) {
    console.log(typeof(value))
    return (
      <View style={[
        Style.scaleVertical,
        {bottom: value + 3},
      ]}>
        <Text style={[
          Style.labelText,
        ]}>{value}</Text><View style={Style.scaleLine}></View>
      </View>
    )
  }
  _renderHorizontalScales(value) {
    return (
      <View>
        <Text style={Style.labelTextHorizontal}>{value}</Text>
      </View>
    )
  }
  render() {
    return (
      <View>
        <View style={Style.graph}>
          <View>
            <View style={Style.bars}>
              {this.state.render_data.map(this._renderHistogram)}
            </View>
            <View style={Style.graphScale}>
              {this.state.horizontalScales.map(this._renderHorizontalScales)}
            </View>
          </View>
          <View style={{
            position: 'absolute',
            left: -10,
            bottom:0,
          }}>
            {this.state.verticalScales.map(this._renderVerticalScales)}
          </View>

        </View>
      </View>
    )
  }
}

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

Histogram.defaultProps = {
  data: [],
  height: 300,
  width: 300,
  horizontal: false,
}

