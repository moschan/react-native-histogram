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

var bar_width = 15
var graph_width = 15

export default class Histogram extends React.Component {
  constructor() {
    super()
    this.state = {
      render_data: [],
      verticalScales: [],
      horizontalScales: [],
      height: 100,
      width: 300,
      horizontal: false,
      magnification: 1,
    }
  }
  componentDidMount() {
    this._initGraph(this.props)
  }
  componentWillReceiveProps(NextProps) {
    this._initGraph(NextProps)
  }
  _initGraph(props) {
    graph_width = props.width
    bar_width = parseInt(props.width/props.split)

    var datas = clone(props.data);

    var render_data =  datas.map((val)=>{
      var formated_sorted_data = this._dataSorter(val)
      var categorized_data = this._dataCategorizer(formated_sorted_data)
      var formated_data = this._dataFormatter(categorized_data)
      return formated_data
    })

    this.setState({
      render_data: render_data,
      verticalScales: this._getVerticalScales(render_data),
      horizontalScales: this._getHorizontalScales(props.data),
    })
  }
  _dataSorter(datas) {
    var sorted_data = datas
    sorted_data.data = Array.prototype.sort.call(datas.data, (a,b) => a-b)
    return datas
  }
  _dataFormatter(datas) {
    var formated_data = datas
    var max = Math.max(...datas.data)
    var magnification = (this.props.height-10-3) / max
    formated_data.magnification = magnification
    // var digit = max.toString(10).length
    formated_data.data = formated_data.data.map((datas)=>{
      return parseInt(datas * magnification)
    })
    return formated_data
  }
  _dataCategorizer(datas) {
    var default_data = datas
    var categorized_data = [0]
    var _data = []
    var max = Math.max(...datas.data)
    var min = Math.min(...datas.data)
    var interdatas = (max - min) / this.props.split
    var threshold = min + interdatas;
    for (var i=0; i<datas.data.length; i++) {
      if (datas.data[i] < threshold) {
        categorized_data[categorized_data.length-1] += 1
      } else if (i+1 != datas.data.length) {
        threshold += interdatas;
        categorized_data.push(0)
      }
    }
    default_data.data = categorized_data
    return default_data
  }

  _getVerticalScales(datas) {
    var return_value = []
    var max = Math.max(
      ...datas.map((data) => {
        return Math.max(...data.data.map((val) => {
          return val / data.magnification
        }))
      })
    )
    var magnification = (this.props.height-3-10) / max
    var interval = max / 5
    var threshold = max

    for(let i of new Array(5)) {
      return_value.push(
        {
          value: Math.floor(threshold),
          position: threshold * magnification,
        }
      )
      threshold = threshold - interval
    }

    return_value.push({value: 0, position: 0 })

    return return_value
  }
  _getHorizontalScales(datas) {
    var memories = []
    var max = Math.max(...datas.map((data) => {return Math.max(...data.data)}))
    var interval = max / this.props.split
    var threshold = 0;
    for(let i of new Array(this.props.split+1)) {
      // TODO can receive decimal parametor
      // memories.push(Math.round( threshold * this.props.height ) / this.props.height)
      memories.push(Math.round( threshold ))
      threshold += interval
    }
    return memories
  }
  _renderHistogram(graph) {
    return graph.data.map((value, index)=>{
      return (
        <View>
          <Bar value={value} magnification={graph.magnification} width={bar_width}/>
        </View>
      )
    })
  }
  _renderVerticalScales(scale) {
    return (
      <View style={[
        Style.scaleVertical,
        {bottom: scale.position + 3},
      ]}>
        <Text style={[
          Style.labelText,
        ]}>{scale.value}</Text>
        <View style={[
          Style.scaleLine,
          {width: graph_width},
        ]}></View>
      </View>
    )
  }
  _renderHorizontalScales(value) {
    return (
      <View>
        <Text style={[
          Style.labelTextHorizontal,
          {width: bar_width}
        ]}>{value}</Text>
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
  height: 100,
  width: 300,
  horizontal: false,
}

