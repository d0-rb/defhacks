import React from 'react';
import '../styles.css';
import './Sidebar.css';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import HotelIcon from '@material-ui/icons/Hotel';
import Button from '@material-ui/core/Button';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  toggleSidebar(open) {
    this.setState({
      open,
    })
  }

  copyId = () => {
    navigator.clipboard.writeText(this.props.roomId);
  }

  render() {
    const { open } = this.state;
    const { roomId, workout, section: sectionIndex, onLeave } = this.props;

    let listItems = [];
    let currentIndex = 0;

    workout.forEach((section) => {
      let icon;

      icon = (section.type == 'exercise') ? <OfflineBoltIcon /> : <HotelIcon />;

      listItems.push(
        <ListItem selected={(currentIndex <= sectionIndex)} button>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={section.title} />
        </ListItem>
      );

      currentIndex += 1;
    })

    return (
      <div className="full-height overlay vert-flex" id="sidebar-overlay">
        <div>
          <IconButton aria-label="timeline" color="primary" onClick={() => this.toggleSidebar(true)}>
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={() => this.toggleSidebar(false)}>
            <div className="white-background vert flex" id="sidebar-container">
              <div id="title">
                <Typography variant="h4">
                  Workout Summary
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className="flex-fill" id="summary-list">
                <List component="nav" aria-label="summary">
                  {listItems}
                </List>
              </div>
              <Button color="secondary" fullWidth size="large" onClick={this.copyId}>
                {roomId}
              </Button>
              <Button variant="contained" color="primary" fullWidth size="large" onClick={onLeave}>
                Leave
              </Button>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default Sidebar;
