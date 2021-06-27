import React, { Component } from 'react';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { List } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import BuildPublicList from './publicList';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import '../styles.css';
import './InitialScreen.css';

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
        'margin-top': 15,
    },
    error: {
        fontSize: '12px',
        color: 'red',
        position: 'relative',
        top: -7,
    },
    textField: {
        margin: 10,
        color: 'white',
        borderColor: "white",
    },

}

export class InitialScreen extends Component {
    state = {
        error: false,
    }
    
    joinMeeting = (room) => {
        const { setAppState } = this.props;

        axios.get(`https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/workouts?id=` + room.workout_id).catch(err => {
            const workout = err.response.data.Item;

            setAppState({
                page: 'meeting',
                roomName: room.name,
                workout: workout.workout,
                startTime: room.startTime,
                roomId: room.id,
            })
        })
    }

    create = e => {
        e.preventDefault();
        this.props.createMeeting();
    }

    checkRoom = e => {
        const { PrivateKeyCode } = this.props.values;
        console.log(PrivateKeyCode)
        axios.get(`https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/rooms?TableName=rooms`).then(res => {
            let room = false;
            let rooms = res.data.Items;
            for (let index in rooms) {
                let currentRoom = rooms[index];
                if (currentRoom.id === PrivateKeyCode) {
                    room = currentRoom;
                }
            }

            if (room) {
                this.setState({ error: false });
                this.joinMeeting(room);
            } else {
                this.setState({ error: true });
            }
        })
    }

    render() {
        const { values, fieldChange, fieldChangeMaster, rooms, setAppState } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <h1>Exercise Reimagined</h1>
                    <div className="groups">
                        <div className="group public-meetings">
                            <List component="nav" className="main-list" aria-label="secondary">
                                <BuildPublicList
                                    rooms={rooms}
                                    setAppState={setAppState}
                                />
                            </List>
                        </div>
                        <div className="group">
                            <div className="create-join">
                                <div className="meetings-button create-meeting">
                                    <Button variant="contained" color="secondary" style={styles.button} onClick={this.create}>
                                        Create Meeting
                                    </Button>
                                </div>
                                <div className="meetings-button join-private-meeting">
                                    <TextField id="pkc" label="Private Key" style={styles.textfield} onChange={fieldChange('PrivateKeyCode')} defaultValue={values.PrivateKeyCode} variant="outlined" />
                                    <TextField id="name" label="Name" style={styles.textfield} onChange={fieldChangeMaster('displayName')} defaultValue={values.Name} variant="outlined" />
                                    <br />
                                    <Button variant="contained" color="primary" style={styles.button} onClick={this.checkRoom}>
                                        Join Private Meeting
                                    </Button>
                                    <br />
                                    {this.state.error && <label style={styles.error}>Invalid Private Key</label>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overlay" id="logo-container">
                        <div className="flex">
                            <img id="logo" src="https://yt4.ggpht.com/ytc/AKedOLTjIHmXJrT1z4ReMkvWExZnefYmw_mqTexs3Cg4dQ=s32-c-k-c0x00ffffff-no-rj" />
                            <div id="app-name" className="vert-flex">
                                Social Exercise App
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default InitialScreen