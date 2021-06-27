import '../styles.css';
import './Timer.css';
import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    height: '100%',
  },
};

class Timer extends Component {
  constructor(props) {
    super();
  }

  formatTime(time, length) {
    let formatArr = [];

    if (length === 0) {
      return '00:00';
    } else if (length === -1) {
      time *= -1;
      formatArr.push(Math.floor(time/3600).toString().padStart(2, '0'));
      formatArr.push(Math.floor((time % 3600)/60).toString().padStart(2, '0'));
      formatArr.push(Math.ceil(time % 60).toString().padStart(2, '0'));

      return formatArr.join(':');
    } else {
      time = (1 - time) * length;
      formatArr.push(Math.floor(time/60).toString().padStart(2, '0'));
      formatArr.push(Math.ceil(time % 60).toString().padStart(2, '0'));

      return formatArr.join(':');
    }
  }

  render() {
    const { time, title, classes, length } = this.props;

    const timeFormatted = this.formatTime(time, length);

    return (
      <div className="flex-fill" id="timer-container">
        <LinearProgress className={classes.root} color="secondary" variant="determinate" value={Math.min(100, Math.max(0, 100 * time))} />
        <div id="clock">
          <div id="clock-text">
            {timeFormatted}
          </div>
          <div id="clock-label">
            {title}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Timer);
