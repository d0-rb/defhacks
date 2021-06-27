import '../styles.css';
import './Preview.css';

function Preview(props) {
  return (
    <div className="light-background vert flex" id="preview-container">
      <div className="neon-background" id="top-bar">
        Up Next
      </div>
      <div className="full-height white-color flex-fill vert-flex" id="preview-display">
        {props.title}
      </div>
    </div>
  );
}

export default Preview;
