import '../styles.css';
import React, { Component } from 'react';
import { LinearProgress, SvgIcon } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    'margin-top': '48px',
    'min-width': '24px',
    width: '24px',
    height: '32px',
    'border-radius': '50%',
  },
  rightAlign: {
    position: 'absolute',
    bottom: '1px',
    left: '1px',
  },
  centerArrow: {
    position: 'relative',
    bottom: '-2px',
    left: '-7px',
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
    const arrowIcon = (open) ? <ArrowUpwardIcon fontSize="inherit" className={classes.centerArrow} /> : <ArrowDownwardIcon fontSize="inherit" className={classes.centerArrow} />;

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
        <div className="checkpoint-container dark-background" style={{width: 100 * section.seconds/length + 'vw'}}>
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
        <Button variant="contained" aria-label="timeline" color="primary" className={classes.margin} onClick={() => this.handleClick()}>
          {arrowIcon}
        </Button>
      </>
    );
  }
}

export default withStyles(styles)(Timeline);
