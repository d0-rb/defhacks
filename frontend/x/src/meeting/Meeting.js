import './Meeting.css';
import './Jitsi.css';
import '../styles.css';
import React from 'react';
import Jitsi from 'react-jitsi'
import Display from './Display';
import Timer from './Timer';
import Preview from './Preview';
import Timeline from './Timeline';
import Sidebar from './Sidebar';

class Meeting extends React.Component {
  constructor(props) {
    super();

    this.state = {
      time: -1,
      section: -1,
      sectionStart: -1,
      sectionEnd: -1,
    };
  }

  getSectionTimes(workout, sectionIndex) {
    let endTime = 0;

    let currentIndex = 0
    workout.forEach((section) => {
      if (currentIndex <= sectionIndex) {
        endTime += parseInt(section.seconds, 10);
      }

      currentIndex += 1;
    });

    return {
      sectionStart: endTime - ((sectionIndex >= workout.length) ? 0 : workout[sectionIndex].seconds),
      sectionEnd: endTime,
    }
  }

  componentDidMount() {
    this.update();
  }
  
  update = () => {
    const { time, sectionEnd } = this.state;
    let { section } = this.state;
    const { startTime, workout } = this.props;

    const currentTime = new Date();
    if (time < 0) { // if it is waiting to start
      this.setState({
        time: (currentTime.getTime() - startTime)/1000,
      });
    } else if (section >= workout.length) { // if workout is over
      this.setState({
        time: (currentTime.getTime() - startTime)/1000,
      });
      
      this.isAudioMuted().then(muted => {
        if (muted) {
          this.toggleAudio();
        }
      });
    } else if (time > sectionEnd) { // if its time to transition to the next section
      section += 1;
      this.setState({
        time: (currentTime.getTime() - startTime)/1000,
        section,
        ...this.getSectionTimes(workout, section)
      });

      this.isAudioMuted().then(muted => { // sets muted status accordingly
        if (muted !== null) {
          if (section < workout.length) {
            if (muted == (workout[section].type == 'break')) {
              this.toggleAudio();
            }
          } else {
            if (muted) {
              this.toggleAudio();
            }
          }
        }
      });
    } else {
      this.setState({
        time: (currentTime.getTime() - startTime)/1000,
      });
    }

    window.requestAnimationFrame(this.update);
  };

  isAudioMuted = () => {
    console.log('wait for the api to load! is audio muted');
    return Promise.resolve(null);
  }

  toggleAudio = () => {
    console.log('wait for the api to load! mute audio');
    return null;
  }

  isVideoMuted = () => {
    console.log('wait for the api to load! is video muted');
    return Promise.resolve(null);
  }

  toggleVideo = () => {
    console.log('wait for the api to load! mute video');
    return null;
  }

  handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.isAudioMuted().then(muted => {
      if (!muted) { // if the person is not muted
        JitsiMeetAPI.executeCommand('toggleAudio') // mute them
      }
    });

    JitsiMeetAPI.isVideoMuted().then(muted => {
      if (muted) { // if the person has no video
        JitsiMeetAPI.executeCommand('toggleVideo') // turn it on
      }
    });

    this.isAudioMuted = () => JitsiMeetAPI.isAudioMuted()
    this.toggleAudio = () => JitsiMeetAPI.executeCommand('toggleAudio')
    this.isVideoMuted = () => JitsiMeetAPI.isVideoMuted()
    this.toggleVideo = () => JitsiMeetAPI.executeCommand('toggleVideo')
  }

  render() {
    const { roomName, displayName, password, workout, roomId, onLeave } = this.props;
    const { time, section, sectionStart, sectionEnd } = this.state;

    let currentGif = 'https://sectionpictures.s3.amazonaws.com/pending.png';
    let nextUp = '';
    let currentTitle = 'Waiting to start...';
    let timerTime = time;
    let length = -1; // these values are for when the session hasnt started yet

    if (section >= workout.length) { // if workout is over
      currentGif = 'https://sectionpictures.s3.amazonaws.com/finished.png';
      currentTitle = 'Congrats!';
      length = 0;
    } else if (section >= 0) { // if it is currently a valid section
      currentGif = workout[section].display;
      currentTitle = workout[section].title;
      timerTime = (time - sectionStart)/(sectionEnd - sectionStart);
      length = sectionEnd - sectionStart;
    }

    if (section+1 > workout.length) { // if workout is over
      nextUp = 'Finished Workout!'
    } else if (section+1 === workout.length) { // if on last section
      nextUp = 'Finish Workout'
    } else {
      nextUp = workout[section+1].title; // if there is one coming up
    }
    console.log(workout);
    console.log(time, sectionStart, sectionEnd);

    return (
      <div className="dark-background full-size">
        <div className="full-size vert-flex">
          <div className="light-background" id="timeline">
            <Timeline workout={workout} time={time} length={workout.reduce((length, section) => length + parseInt(section.seconds, 10), 0)} />
          </div>
          <div className="flex-fill" id="jitsi-frame">
            <Jitsi
              roomName={roomName}
              displayName={displayName}
              frameStyle={{ display: 'block', width: '100%', height: '100%' }}
              containerStyle={{ width:'800px', height: '400px' }}
              onAPILoad={this.handleAPI}
              loadingComponent={'bruh'}
            />
          </div>
          <div className="flex mid-background" id="bottom-bar">
            <Display gif={currentGif} />
            <Timer time={timerTime} title={currentTitle} length={length} />
            <Preview title={nextUp} />
          </div>
        </div>
        <Sidebar roomId={roomId} workout={workout} section={section} onLeave={onLeave} />
      </div>
    );
  }
}

export default Meeting;
