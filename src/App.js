import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BarChart, Cell, Brush, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { VictoryBar, VictoryAxis, VictoryZoomContainer, VictoryTooltip, VictoryChart, VictoryGroup, VictoryTheme } from 'victory';
import assign from 'object-assign';

const data = [
                {
                  name: "Инициатор",
                  duration: 123123,
                  color: '#D0E06E',
                  durationText:'00:00',
                  label: "SomeTooltip"
                }, {
                  name: "Начальник",
                  duration: 11111,
                  color: '#8CB838',
                  durationText:'00:00',
                  label: "SomeTooltip"
                }, {
                  name: "Бухгалтер",
                  duration: 55554,
                  durationText:'00:00',
                  color: '#ACD249',
                  label: "SomeTooltip"
                }
              ];

const CustomTooltip  = React.createClass({

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="toolTipWrapper">
          <p className="label">{`${label}`}</p>
          <p className="detail">{`Длительность:${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  }
});

const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
		
   	return (
      <g transform={`translate(${x},${y})`} className="recharts-layer recharts-cartesian-axis-tick">
        <text x={0} y={0} dy={6} className="recharts-text recharts-cartesian-axis-tick-value" textAnchor="end" fill="#666">{payload.value}</text>
      </g>
    );
  }
});

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
            <BarChart width={600} height={300} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis axisLine={false} tick={<CustomizedAxisTick />}/>
                <CartesianGrid vertical={false} stroke="#ebf3f0"/>
                <Tooltip content={<CustomTooltip/>}/>
                <Brush dataKey='name' height={30} stroke="#cfd6d9"/>
                <Bar dataKey="duration" fill="#82ca9d" onClick={this.handleClick} minPointSize={10}>
                {
                  data.map((entry, index) => (
                    <Cell cursor="pointer" fill={entry.color} key={`cell-${index}`}/>
                  ))
                }
                </Bar>
            </BarChart>  
          </div>
      </div>
    );
  }
}

export default App;
