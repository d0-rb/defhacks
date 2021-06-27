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
      roomName: '',
      displayName: '',
      password: '',
      workout: [],
      startTime: currentTime.getTime(),
      roomId: 0,
    };
  }
  
  setMasterState = (state) => {
    this.setState(state);
  }

  setPage = (page) => {
    this.setState({
      page,
    })
  }

  render() {
    const { roomName, displayName, password, workout, startTime, roomId } = this.state;

    let { page } = this.state;

    switch (page) {
      case 'main':
        page = (
          <header className="App-header">
            <Home
              roomName={roomName}
              displayName={displayName}
              password={password}
              startTime={startTime}
              roomId={roomId}
              setAppState={this.setMasterState}
              onJoin={() => this.setPage('meeting')}
            />
          </header>
        )
        break;
      case 'meeting':
        page = (
        <ThemeProvider theme={theme}>
          <Meeting
            roomName={roomName}
            displayName={displayName}
            password={password}
            workout={workout}
            startTime={startTime}
            roomId={roomId}
            onLeave={() => this.setPage('main')}
          />
        </ThemeProvider>
        );
        break;
    }
    
    return (
      <div className="App full-size">
        {page}
      </div>
    );
  }
}

export default App;