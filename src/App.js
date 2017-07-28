import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ResponsiveContainer, BarChart, Cell, Brush, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { VictoryBar, VictoryAxis, VictoryZoomContainer, VictoryTooltip, VictoryChart, VictoryGroup, VictoryTheme } from 'victory';
import assign from 'object-assign';

const data = [
                {
                  name: "Инициатор",
                  duration: 900,
                  color: '#D0E06E'
                }, {
                  name: "Начальник",
                  duration: 3600,
                  color: '#8CB838'
                }, {
                  name: "Бухгалтер",
                  duration: 2100,
                  color: '#ACD249',
                }
              ];

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
      return (
        <div className="toolTipWrapper">
          <p className="label">{`${label}`}</p>
          <p className="detail">{`Длительность: ${value}`}</p>
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(data, index) {
  	this.setState({
    	activeIndex: index
    });
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
            <BarChart height={300} data={data}
                margin={{top: 5, right: 100, left: 70, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis axisLine={false} tick={<CustomizedAxisTick />}/>
                <CartesianGrid vertical={false} stroke="#ebf3f0"/>
                <Tooltip content={<CustomTooltip/>}/>
                <Brush dataKey='name' height={30} stroke="#8F8F8F"/>
                <Bar dataKey="duration" fill="#82ca9d" onClick={this.handleClick} minPointSize={10}>
                {
                  data.map((entry, index) => (
                    <Cell cursor="pointer" fill={entry.color} key={`cell-${index}`}/>
                  ))
                }
                </Bar>
              </BarChart> 
            </ResponsiveContainer> 
          </div>
      </div>
    );
  }
}

export default App;
