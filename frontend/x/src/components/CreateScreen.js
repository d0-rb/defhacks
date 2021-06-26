import React, { Component } from 'react';
import { MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import green from '@material-ui/core/colors/green';
import "./createScreen.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import WorkoutCards from "./workoutCards";
import TimeField from 'react-simple-timefield';

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
    textfield: {
        margin: 10,
        color: 'white',
        borderColor: "white",
        verticalAlign: "middle"
    }
}

export class CreateScreen extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.simulateClick = this.simulateClick.bind(this)
    }

    join = e => {
        e.preventDefault();
        this.props.joinMeeting();
    }

    create = e => {
        e.preventDefault();
        this.props.createMeeting();
    }

    addNewItem = e => {
        const { values } = this.props;
        var finalArray = values.workouts
        finalArray.push(["", "00:00:00", "", ""])
        var workoutsObject = { workouts: finalArray }

        this.setState(workoutsObject);
        console.log(values.workouts)
    }

    uploadEverything = (e) => {
        //Create meeting first
        const { values, workouts } = this.props;
        const fd = new FormData();
        var timestamp = new Date().getUTCMilliseconds();
        var secondPortion = Math.round(Math.random() * 10000);
        var id = timestamp + secondPortion;
        var timestamp1 = new Date().getUTCMilliseconds();
        var secondPortion1 = Math.round(Math.random() * 10000);
        var id1 = timestamp1 + secondPortion1;
        fd.append('id', id);
        fd.append('workout_id', id1);
        fd.append('name', values.RoomName)
        fd.append('private', values.privatek)
        axios.post('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/rooms', fd, {
            onUploadProgress: progressEvent => {
                console.log(Math.round(progressEvent.loaded / progressEvent.total) * 100)
            }
        }).then(
            res => {
                console.log(res)
            }
        )

        //Add workouts to meeting
        const fd1 = new FormData();
        fd1.append('id', id1);
        fd1.append('name', values.WorkoutName);
        fd1.append('workout', values.workouts);
        fd1.append('TableName', 'workouts');
        axios.post('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/rooms', fd1, {
            onUploadProgress: progressEvent => {
                console.log(Math.round(progressEvent.loaded / progressEvent.total) * 100)
            }
        }).then(
            res => {
                console.log(res)
            }
        )
    }

    fileUploadHandler = (e) => {
        var data;
        var selectedFile = e.target.files[0];
        const fd = new FormData();
        fd.append('name', e.target.files[0].name)
        console.log(selectedFile)
        var reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            data = event.target.result;
            fd.append('data', data);
            axios.post('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/images', fd, {
                onUploadProgress: progressEvent => {
                    console.log(Math.round(progressEvent.loaded / progressEvent.total) * 100)
                }
            }).then(
                res => {
                    console.log(res)
                }
            )
        };
        reader.readAsDataURL(selectedFile);
    }

    simulateClick() {
        this.myRef.current.click();
    }

    createWorkoutItems = () => {
        const { values, fieldChange, time, changeWorkouts } = this.props;

        let formControl = []

        for (var i = 0; i < values.workouts.length; i++) {
            let workoutSection = <div className="workout-fill-in"><TextField label="Name of Workout" style={styles.textfield} onChange={changeWorkouts("roomName", i)} defaultValue={values.RoomName} variant="outlined" /><TimeField
                value={time}                     // {String}   required, format '00:00' or '00:00:00'
                onChange={(value) => { changeWorkouts("time", i); }}      // {Function} required
                colon=":"
                showSeconds
                style={styles.textfield}
                input={<TextField label="Time for Interval" style={styles.textfield} value={time} variant="outlined" />}
            />
                <div className="formContainer"><FormControl component="fieldset">
                    <RadioGroup aria-label="workoutType" name={"private" + i} value={values.workoutType} onChange={changeWorkouts("workoutType", i)}>
                        <FormControlLabel value="exercise" control={<Radio />} label="Exercise" />
                        <FormControlLabel value="break" control={<Radio />} label="Break" />
                    </RadioGroup>
                </FormControl>
                </div>
                <div className="fileUploadContainer">
                    <input type="file" name={"file" + i} id={"file" + i} style={{display:"none"}} ref={this.myRef} onChange={this.fileUploadHandler} />
                    <label htmlFor={"file" + i}><Button variant="contained" color="secondary" style={styles.button} onClick={this.simulateClick}>Select Photo For Interval</Button></label>
                </div>
            </div>
            formControl.push(workoutSection)
        }
        let addMore1 = <div><Divider /><br /></div>
        formControl.push(addMore1)
        let addMore = <div className="bottom-button-holder"><Button variant="contained" color="secondary" style={styles.button} onClick={this.addNewItem}>Add Exercise</Button><Button variant="contained" color="primary" style={styles.button} onClick={this.uploadEverything}>Create Exercise</Button></div>
        formControl.push(addMore)
        return formControl
    }

render() {
    const { values, fieldChange, workouts } = this.props;

    return (
        <MuiThemeProvider theme={theme}>
            <React.Fragment>
                <div className="wrapper">
                    <div className="top-container">
                        <h1>Create Your Exercise Routine</h1>
                        <p>Start Your Fitness Jouney Today</p>
                    </div>
                    <div className="form-container">
                        <TextField id="name2" label="Name" style={styles.textfield} onChange={fieldChange('Name')} defaultValue={values.Name} variant="outlined" />
                        <TextField id="rn" label="Room Name" style={styles.textfield} onChange={fieldChange('RoomName')} defaultValue={values.RoomName} variant="outlined" />
                        <TextField id="wn" label="Workout Name" style={styles.textfield} onChange={fieldChange('WorkoutName')} defaultValue={values.WorkoutName} variant="outlined" />
                        <div className="formContainer">
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="private" name="private1" value={values.privatek} onChange={fieldChange('privatek')}>
                                    <FormControlLabel value="public" control={<Radio />} label="Public Meeting" />
                                    <FormControlLabel value="private" control={<Radio />} label="Private Meeting" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <h3>Workouts</h3>
                        <WorkoutCards
                            createWorkoutItems={this.createWorkoutItems}
                            workouts={workouts}
                        />
                    </div>
                </div>
            </React.Fragment>
        </MuiThemeProvider>
    )
}
}

export default CreateScreen