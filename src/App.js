import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { VictoryBar, VictoryAxis, VictoryZoomContainer, VictoryTooltip, VictoryChart, VictoryGroup, VictoryTheme } from 'victory';
import assign from 'object-assign';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      selectedDomain: null,
      zoomDomain: null
    };
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    const data = [
                {
                  name: "Инициатор",
                  duration: 123123,
                  color: '#D0F165',
                  durationText:'00:00',
                  label: "SomeTooltip"
                }, {
                  name: "Начальник",
                  duration: 11111,
                  color: '#A6D34B',
                  durationText:'00:00',
                  label: "SomeTooltip"
                }, {
                  name: "Бухгалтер",
                  duration: 55554,
                  durationText:'00:00',
                  color: '#A7D54B',
                  label: "SomeTooltip"
                }
              ];
    const tickValues = [
        123123,
        11111,
        55554,
        75656,
        433434
    ];
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <div style={{height:'500px'}}>
              <VictoryChart
                theme={VictoryTheme.material}
                
                containerComponent={
                  <VictoryZoomContainer
                    dimension="x"
                    zoomDomain={this.state.zoomDomain}
                    onDomainChange={this.handleZoom.bind(this)}
                  />
                } 
                domainPadding={50}>
                <VictoryBar data={data} x="name" y={(d) => d.duration}
                  animate={{ onLoad: { duration: 1000 } }}
                  
                  style={{ data: 
                  {
                    fill:(d) => {
                      return d.color;
                    },
                    width: 60 
                  } 
                  }}
                  labelComponent={
                  <VictoryTooltip
                    cornerRadius={(d) => 0}
                    pointerLength={(d) => 5}
                    flyoutStyle={{
                      fill: (d) => "white",
                      stroke: (d) => '#d8dadf'
                    }}
                  />}
                />
              <VictoryAxis dependentAxis
                  tickFormat={(x) => 
                  {
                      return "00:00";
                  }}
                  style={{
                    axisLabel: { padding: 40 }
                  }}
                />
              <VictoryAxis
                style={{
                  axisLabel: { padding: 30 }
                }}
              />
              </VictoryChart>
            </div>
        </p>
      </div>
    );
  }
}

export default App;
