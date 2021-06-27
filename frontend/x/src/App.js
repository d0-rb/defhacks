import './App.css';
import Meeting from './meeting/Meeting';
import React from 'react';
import Home from './components/home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#4caf50',
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super();

    const currentTime = new Date();

    this.state = {
      page: 'main',
      roomName: '24',
      displayName: 'bruh',
      password: 'abc',
      workout: [
        {
          title: 'push-ups',
          display: 'https://media1.tenor.com/images/c11426c31706abc656c031d7b075af5f/tenor.gif?itemid=15823888',
          seconds: 5,
          type: 'exercise',
        },
        {
          title: 'rest',
          display: 'https://media1.tenor.com/images/9cf8d7db2b421a8e2fed7d19882640ce/tenor.gif?itemid=17105030',
          seconds: 10,
          type: 'break',
        },
      ],
      startTime: currentTime.getTime() + 10000,
    };
  }

  leave = () => {
    console.log('leave!!');
  }

  render() {
    const { roomName, displayName, password, workout, startTime } = this.state;
    
    return (
      <div className="App full-size">
        <ThemeProvider theme={theme}>
          <Meeting
            roomName={roomName}
            displayName={displayName}
            password={password}
            workout={workout}
            startTime={startTime}
            onLeave={this.leave}
          />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;