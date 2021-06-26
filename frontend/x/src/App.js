import Meeting from './meeting/Meeting';
import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#64dd17',
    },
    secondary: {
      main: '#64dd17',
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      page: 'main',
      roomName: '24',
      displayName: 'bruh',
      password: 'abc',
      workout: [
        {
          title: 'push-ups',
          display: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif',
          duration: 30,
          type: 'exercise',
        },
        {
          title: 'rest',
          display: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif',
          duration: 10,
          type: 'break',
        }
      ],
    };
  }

  render() {
    const { roomName, displayName, password, workout } = this.state;
    
    return (
      <div className="App full-size">
        <ThemeProvider theme={theme}>
          <Meeting
            roomName={roomName}
            displayName={displayName}
            password={password}
            workout={workout}
          />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
