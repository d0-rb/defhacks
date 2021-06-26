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
import { MenuItem, Select } from '@material-ui/core';

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
        finalArray.push({ workoutName: "", time: "00:00:00", workoutType: "exercise", gif: ""})
        var workoutsObject = { workouts: finalArray }
        this.setState(workoutsObject)
        console.log(values.workouts)
    }

    removeItem = e => {
        const i = e.currentTarget.name.split(":")[1]
        console.log(i)
        const { values } = this.props;
        var finalArray = values.workouts
        finalArray.splice(i, 1)
        var workoutsObject = { workouts: finalArray }

        this.setState(workoutsObject);
        console.log(values.workouts)
    }

    fileUploadHandler = (e) => {
        console.log(e)
        var selectedFile = e.target.files[0];
        const fd = new FormData();
        fd.append('name', e.target.files[0].name)
        console.log(selectedFile)
        var reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            console.log(event.target.result)
            fd.append('data', event.target.result);
        };
        reader.readAsDataURL(selectedFile);
        axios.post('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/images', fd, {
            onUploadProgress: progressEvent => {
                console.log(Math.round(progressEvent.loaded / progressEvent.total) * 100)
            }
        }).then(
            res => {
                console.log(res)
            }
        )
    }

    createWorkoutItems = () => {
        const { values, getWorkouts, time, changeWorkouts } = this.props;

        let formControl = []

        for (var i = 0; i < values.workouts.length; i++) {
            let index = i;
            let workoutSection = <div className="workout-fill-in">
                <label><Button variant="contained" color="secondary" name={"removeWorkout:" + i} style={styles.button} onClick={this.removeItem}>Remove</Button></label>
                <Select name={"workoutType:" + i} style={styles.textfield} onChange={changeWorkouts("workoutType")} value={getWorkouts(index, "workoutType")} variant="outlined">
                    <MenuItem value="exercise">Exercise</MenuItem>
                    <MenuItem value="break">Break</MenuItem>
                </Select>
                <TextField label="Name of Workout" name={"workoutName:" + i} style={styles.textfield} value={getWorkouts(index, "workoutName")} onChange={changeWorkouts("workoutName")} variant="outlined" />
                <TimeField
                    name={"time:" + i}
                    value={getWorkouts(index, "time")}                     // {String}   required, format '00:00' or '00:00:00'
                    // {Function} required
                    colon=":"
                    onChange={changeWorkouts("time")}
                    showSeconds
                    style={styles.textfield}
                    input={<TextField label="Time for Interval" style={styles.textfield} value={getWorkouts(index, "time")} variant="outlined" />}
                />
                <div className="fileUploadContainer">
                    <input type="file" name={"file:" + i} id={"file" + i} onChange={this.fileUploadHandler} />
                    <label htmlFor={"file" + i}><Button variant="contained" color="secondary" style={styles.button}>Select Photo For Interval</Button></label>
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
                            <TextField id="name2" label="Name" style={styles.textfield} onChange={fieldChange('name')} defaultValue={values.Name} variant="outlined" />
                            <TextField id="rn" label="Room Name" style={styles.textfield} onChange={fieldChange('roomName')} defaultValue={values.RoomName} variant="outlined" />
                            <div className="formContainer">
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="private" name="private1" value={values.privateStatus} onChange={fieldChange('privateStatus')}>
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