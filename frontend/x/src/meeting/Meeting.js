import './Meeting.css';
import '../styles.css';
import React from 'react';
import Display from './Display';
import Timer from './Timer';
import Preview from './Preview';
import Timeline from './Timeline';

class Meeting extends React.Component {
  constructor(props) {
    super();

    this.state = {
      time: 15,
      section: 0,
      currentTimer: 0,
    };
  }

  render() {
    const { roomName, displayName, password, workout } = this.props;
    const { time, section, currentTimer } = this.state;

    return (
      <div className="dark-background full-size">
        <div className="full-size vert-flex">
          <div className="light-background" id="timeline">
            <Timeline workout={workout} time={time} length={workout.reduce((length, section) => length + section.duration, 0)} />
          </div>
          <div className="flex-fill" id="jitsi-frame">
          </div>
          <div className="horiz-flex mid-background" id="bottom-bar">
            <Display gif={workout[section].display} />
            <Timer time={currentTimer} />
            <Preview title={(section >= workout.length) ? 'Finish workout' : workout[section].title} />
          </div>
        </div>
      </div>
    );
  }
}

export default Meeting;
