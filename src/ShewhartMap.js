import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ResponsiveContainer, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Line, LineChart } from 'recharts';
import { VictoryBar, VictoryAxis, VictoryZoomContainer, VictoryTooltip, VictoryChart, VictoryGroup, VictoryTheme } from 'victory';
import assign from 'object-assign';

const data = [
                {
                  duration: 900,
                  date: new Date(2017, 1, 1).getTime()
                }, {
                  duration: 3600,
                  date: new Date(2017, 1, 11).getTime()
                }, {
                  duration: 2100,
                  date: new Date(2017, 1, 21).getTime()
                }, {
                  duration: 2700,
                  date: new Date(2017, 1, 30).getTime()
                }, {
                  duration: 3480,
                  date: new Date(2017, 2, 10).getTime()
                }, {
                  duration: 5760,
                  date: new Date(2017, 2, 20).getTime()
                }
              ];

class CustomLineLabel extends Component {
  constructor(props) {
    super(props);

    this.pad = this.pad.bind(this);
  }

  pad(n, width) {
    var n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

  render () {
    const {x, y, stroke, value} = this.props;
    const hh = Math.floor(value / 3600);
    const mm = Math.floor((value % 3600) / 60);
    const ss = value % 60;
    const duration = this.pad(hh, 2) + ":" + this.pad(mm, 2) + ":" + this.pad(ss, 2);

   	return <text x={x} y={y} dy={-10} fill={stroke} fontSize={10} textAnchor="middle">{duration}</text>
  }
}

class CustomTooltip extends Component {
  constructor(props) {
    super(props);

    this.pad = this.pad.bind(this);
  }

  pad(n, width) {
    var n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      const hh = Math.floor(payload[0].value / 3600);
      const mm = Math.floor((payload[0].value % 3600) / 60);
      const ss = payload[0].value % 60;
      const value = this.pad(hh, 2) + ":" + this.pad(mm, 2) + ":" + this.pad(ss, 2);
      const date = new Date(label).toLocaleString(window.navigator.language, { day: 'numeric', month: 'long' });
      return (
        <div className="toolTipWrapper">
          <p className="label">{`${date}`}</p>
          <p className="detail">{`Средняя длительность: ${value}`}</p>
        </div>
      );
    }

    return null;
  }
}

class CustomizedAxisTick extends Component {
  constructor(props) {
    super(props);

    this.pad = this.pad.bind(this);
  }

  pad(n, width) {
    var n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

  render () {
    const {x, y, stroke, payload} = this.props;
	const hh = Math.floor(payload.value / 3600);
    const mm = Math.floor((payload.value % 3600) / 60);
    const ss = payload.value % 60;
    const value = this.pad(hh, 2) + ":" + this.pad(mm, 2) + ":" + this.pad(ss, 2);
   	return (
      <g transform={`translate(${x},${y})`} className="recharts-layer recharts-cartesian-axis-tick">
        <text x={0} y={0} dy={6} dx={-5} className="recharts-text recharts-cartesian-axis-tick-value" textAnchor="end" fill="#666">{value}</text>
      </g>
    );
  }
}

class CustomizedDateAxisTick extends Component {
  constructor(props) {
    super(props);

    this.pad = this.pad.bind(this);
  }

  pad(n, width) {
    var n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

  render () {
    const {x, y, stroke, payload} = this.props;
    const date = new Date(payload.value);
    const value = date.toLocaleString(window.navigator.language, { day: 'numeric', month: 'long' });
   	return (
      <g transform={`translate(${x},${y})`} className="recharts-layer recharts-cartesian-axis-tick">
        <text x={0} y={0} dy="15" dx="30" className="recharts-text recharts-cartesian-axis-tick-value" textAnchor="end" fill="#666">{value}</text>
      </g>
    );
  }
}

class ShewhartMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.dateFormat = this.dateFormat.bind(this);
  }

  handleClick(data, index) {
  	this.setState({
    	activeIndex: index
    });
  }

  dateFormat(time) {
    const date = new Date(time);
    const value = date.toLocaleString(window.navigator.language, { day: 'numeric', month: 'long' });
    return value;
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro"/>
        <div style={{height:'500px'}}>
          <ResponsiveContainer width="100%" height={300}>
              <LineChart height={300} data={data} margin={{top: 20, right: 100, left: 70, bottom: 5}}>
                <XAxis tick={<CustomizedDateAxisTick />} dataKey="date"/>
                <YAxis tick={<CustomizedAxisTick />}/>
                <CartesianGrid stroke="#ebf3f0"/>
                <Tooltip content={<CustomTooltip/>}/>
                <Line label={<CustomLineLabel />} strokeWidth={3} type="monotone" dataKey="duration" stroke="#7A7A7A" activeDot={{r: 8}}/>
                <Brush tickFormatter={this.dateFormat} dataKey='date' height={30} stroke="#8F8F8F">
                    <LineChart height={300} data={data} margin={{top: 20, right: 100, left: 70, bottom: 5}}> 
                        <CartesianGrid stroke="#ebf3f0"/>
                        <Line strokeWidth={3} type="monotone" dataKey="duration" stroke="#7A7A7A" activeDot={{r: 8}}/>
                    </LineChart>  
                </Brush>
              </LineChart>
            </ResponsiveContainer> 
          </div>
      </div>
    );
  }
}

export default ShewhartMap;
