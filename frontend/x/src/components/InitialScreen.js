import React, { Component } from 'react';
import { MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import green from '@material-ui/core/colors/green';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500]
        },
        secondary: {
            main: "#ddd"
        }
    },
    typography: {
        useNextVariants: true
    }
});

const styles = {
    button: {
        margin: 15,
    },
    textField: {
        margin: 10,
        color: 'white',
        borderColor: "white",
    }
}

export class InitialScreen extends Component {
    join = e => {
        e.preventDefault();
        this.props.joinMeeting();
    }

    create = e => {
        e.preventDefault();
        this.props.createMeeting();
    }

    render() {
        const { values, fieldChange } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <h1>Welcome to x</h1>
                    <div className="groups">
                        <div className="group public-meetings">
                            <List component="nav" className="main-list" aria-label="secondary">
                                <ListItem button>
                                    <ListItemText primary="Group 1" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Group 2" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Group 3" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Group 4" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Group 5" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Group 6" />
                                </ListItem>
                                <Divider />
                            </List>
                        </div>
                        <div class="group">
                            <div class="create-join">
                                <div class="meetings-button create-meeting">
                                    <Button variant="contained" color="secondary" style={styles.button} onClick={this.create}>
                                        Create Meeting
                                    </Button>
                                </div>
                                <div class="meetings-button join-private-meeting">
                                    <TextField id="pkc" label="Private Key" style={styles.textfield} onChange={fieldChange('PrivateKeyCode')} defaultValue={values.PrivateKeyCode} variant="outlined" />
                                    <TextField id="name" label="Name" style={styles.textfield} onChange={fieldChange('Name')} defaultValue={values.Name} variant="outlined" />
                                    <Button variant="contained" color="primary" style={styles.button} onClick={this.join}>
                                        Join Private Meeting
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default InitialScreen