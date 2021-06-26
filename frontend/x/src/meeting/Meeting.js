import './Meeting.css';
import '../styles.css';
import Display from './Display';
import Timer from './Timer';
import Preview from './Preview';

function Meeting() {
  return (
    <div className="dark-background full-size">
      <div className="full-size vert-flex">
        <div className="flex-fill" id="jitsi-frame">
        </div>
        <div className="horiz-flex mid-background" id="bottom-bar">
          <Display id="exercise-display" />
          <Timer className="flex-fill" />
          <Preview id="preview" />
        </div>
      </div>
    </div>
  );
}

export default Meeting;
