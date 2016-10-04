react-native-histogram
===

> histogram component for React Native

[![npm](https://img.shields.io/npm/v/react-native-histogram.svg)]()[![npm](https://img.shields.io/npm/l/react-native-histogram.svg)]()

[![NPM](https://nodei.co/npm/react-native-histogram.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-histogram/)


Demo
---
![](./doc/beta2.gif)


Installation
==

```
npm i -S react-native-histogram
```

## Getting Started

Simple
---
```
<Histogram data={this.state.data} />
```


Advenced
---
```
import Histogram from 'react-native-histogram';

var HistogramExample = React.createClass({
  getInitialState: function() {
    return {data: [{}]}
  },
  componentWillMount: function() {
    var row_datas = [];
    for (var i=0; i<500; i++) {
      row_datas[i] = Math.random() * 100;
    }
    this.setState({
      data: [{ data: row_datas }]
    })
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View>
          <Histogram
            data={this.state.data}
            height={200}
            width={300}
            split={20}
          />
        </View>
      </View>
    );
  }
});

```


Props
===

data `Default: []`
---
The list of value for histogram. Ex. `[{data: [10, 13, 8, 19, 17]}]`

width `Default: 0`
---
The width of graph.

height `Default: 0`
---
The height of graph.


TODO
===
- [x] show simple histogram
- [x] show values
- [ ] show balloon
- [ ] show multiple historgams
- [ ] show unit


Contributing
==
Of course! Welcome :)

You can use following command in `example` dir:

```
npm run sync
```

During running this command, when you change source to implement/fix something, these changes will sync to `example/node_modules/react-native-histogram/`. You can check your change using example project easily.


License
==
MIT

