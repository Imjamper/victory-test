import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryTheme } from 'victory';
import assign from 'object-assign';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  render() {
    const data = [
                {
                  name: "Версия 1",
                  duration: 24
                }, {
                  name: "Версия 2",
                  duration: 13
                }, {
                  name: "Версия 3",
                  duration: 70
                }
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
                domainPadding={50}>
                <VictoryBar data={data} x="name" y="duration"
                  animate={{ onLoad: { duration: 1000 } }}
                  style={{ data: { width: 60 } }}
                  events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onMouseOver: () => {
                        return [
                          {
                            mutation: (props) => 
                            {
                              return {
                                style: assign(props.style, {fill: "#2F4F4F"})
                              }
                            }
                          }
                        ];
                      },
                      onMouseOut: () => {
                        return [{
                          mutation: () => 
                          {
                            return null;
                          }
                        }];
                      },
                      onClick: () => {
                        return [{
                          mutation: (props) => 
                          {
                            
                            return {
                              style: assign(props.style, {fill: "#2F4F4F"})
                            }
                          }
                        }]
                      }
                    }
                  }
                ]}
                />
              </VictoryChart>
            </div>
        </p>
      </div>
    );
  }
}

export default App;
