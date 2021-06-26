import '../styles.css';
import React, { Component } from 'react';
import { LinearProgress, SvgIcon } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import HotelIcon from '@material-ui/icons/Hotel';

const styles = {
  root: {
    height: '100%',
  },
  margin: {
    display: 'block',
    margin: 'auto',
  },
  rightAlign: {
    position: 'absolute',
    bottom: '20%',
    left: '3px',
  }
};

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.timelineDetailRef = React.createRef();
  }

  handleClick() {
    const { open } = this.state;

    const detail = this.timelineDetailRef.current;
    detail.classList.toggle('open');
    this.setState({open: !open});
  }

  render() {
    const { workout, time, length, classes } = this.props;
    const { open } = this.state;
    const arrowIcon = (open) ? <ArrowUpwardIcon fontSize="inherit" /> : <ArrowDownwardIcon fontSize="inherit" />;

    let markers = [];

    workout.forEach((section) => {
      let icon;
      switch (section.type) {
        case 'exercise':
          icon = (<OfflineBoltIcon className={classes.rightAlign} fontSize="large" color="primary" />);
          break;
        case 'break':
          icon = (<HotelIcon className={classes.rightAlign} fontSize="large" color="primary" />);
          break;
      }

      markers.push(
        <div className="checkpoint-container" style={{width: 100 * section.duration/length + 'vw'}}>
          {icon}
          <div className="checkpoint white-background" />
        </div>
      )
    })

    return (
      <>
        <div ref={this.timelineDetailRef} className="full-width dark-background hide-top" id="workout-checkpoints">
          {markers}
        </div>
        <LinearProgress className={classes.root} variant="determinate" value={Math.min(100, Math.max(0, 100 * time/length))} />
        <IconButton aria-label="timeline" color="primary" className={classes.margin} onClick={() => this.handleClick()}>
          {arrowIcon}
        </IconButton>
      </>
    );
  }
}

export default withStyles(styles)(Timeline);
