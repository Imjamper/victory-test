import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Menu.css';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryTheme } from 'victory';
import assign from 'object-assign';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
            
        </p>
        <div>
                <div>
                    <div className={'people-list'} id={'people-list'}>
                        <ul className={"list"}> 
                            <li style={{display:'block'}} key={'123123'} className={'clearfix'}>
                                <div className={'userSelector'}>
                                    <img src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"} alt={'avatar'} />
                                    <div className={"about"}>
                                        <div className={"name"}>SomeName</div>
                                        <div className={"status"}><i className={'fa fa-circle online'}></i> 
                                            {'online'}
                                        </div>
                                    </div>
                                </div>
                            </li> 
                        </ul>
                    </div>
                    <div id={"chatWindowDiv"} className={'chat'}>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

export default Menu;
