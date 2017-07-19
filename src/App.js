import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { VictoryBar, VictoryAxis, VictoryZoomContainer, VictoryTooltip, VictoryChart, VictoryGroup, VictoryTheme, VictoryBrushContainer, Bar, VictoryLabel } from 'victory';
import assign from 'object-assign';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      selectedDomain: { x: [0, 6] },
      zoomDomain: { x: [0, 6] },
      data: []
    };
    for (var i = 0; i < 10; i++){
      this.state.data.push({
        name: "Тест" + i,
        duration: Math.random() * 1000,
        color: '#D0F165',
        durationText: '00:00',
        label: "SomeTooltip"
      });
    }
  }

  handleZoom(domain) {
    if (domain.x[1] > domain.x[0] + 6)
      domain.x[1] = domain.x[0] + 6  
    console.log("["+domain.x[0] + "," + domain.x[1]+"]");
    console.log(domain);
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    
    if (domain.x[1] > domain.x[0] + 6)
      domain.x[1] = domain.x[0] + 6  
    console.log("["+domain.x[0] + "," + domain.x[1]+"]");
    console.log(domain);
    this.setState({zoomDomain: domain});
  }

  handleMouseClick = (domain, event) => {
    console.log(domain);
    console.log(event);
  }

  render() {   
    const data = this.state.data;    
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
                height={500}
                width={500}               
                containerComponent={
                  <VictoryZoomContainer
                    dimension="x"
                    zoomDomain={this.state.zoomDomain}
                    onDomainChange={this.handleZoom.bind(this)}
                  />
                } 
               
              >

                <VictoryBar 
                  data={data}
                  x="name" 
                  y={(d) => d.duration}
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
                    />
                  }
                  events={[
                      {
                        target: "data",
                        eventHandlers: {
                          onClick: () => {
                            return [{
                              target: "labels",
                              mutation: (props) => {
                                return console.log(props);
                              }
                            }];
                          }
                        }
                      }
                    ]}
                />
                <VictoryAxis dependentAxis tickFormat={(x) => { return "00:00"; }} style={{ axisLabel: { padding: 40 } }} />
                <VictoryAxis style={{ axisLabel: { padding: 30 } }} />
              </VictoryChart> 
              </div>
              <div style={{height:'100px'}}> 
              <VictoryChart
                theme={VictoryTheme.material} 
                height={150}
                width={600} 
                domainPadding={{ x: [20, 20]}}
               
                containerComponent={
                  <VictoryBrushContainer
                    dimension="x"
                    selectedDomain={this.state.selectedDomain}
                    onDomainChange={this.handleBrush.bind(this)}
                    responsive={false}
                    viewBox = "0, 0, 100%, auto"
                  />
                }
              >
                  
                  <VictoryBar 
                    data={data} 
                    y={(d) => d.duration}
                    style={{ data: 
                    {
                      fill:(d) => {
                        return d.color;
                      },
                      width: 10
                      
                    } 
                    }}
                    labelComponent={<VictoryLabel text=""/>}               
                  />
                  <VictoryAxis  />
          </VictoryChart>
            </div>
        </p>
      </div>
    );
  }
}

export default App;
