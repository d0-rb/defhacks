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
import { IconButton } from '@material-ui/core';


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
        var reader = new FileReader();
        const { values } = this.props;
        reader.onload = function (event) {
            // The file's text will be printed here
            data = event.target.result;
            const json = JSON.stringify({'name': e.target.files[0].name, 'data': data});
            axios.post('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/images', json, {
                headers: {
                    'Content-Type': 'application/json'
                },
                onUploadProgress: progressEvent => {
                    console.log(Math.round(progressEvent.loaded / progressEvent.total) * 100)
                }
            }).then(
                res => {
                    var listNumber = e.target.name.split(":")[1]
                    var finalArray = values.workouts
                    finalArray[listNumber]['gif'] = res.data.url
                    var workoutsObject = { workouts: finalArray }
                    this.setState(workoutsObject);
                }
            )
        }.bind(this);
        reader.readAsDataURL(selectedFile);
    }

    simulateClick() {
        this.myRef.current.click();
    }

    createWorkoutItems = () => {
        const { values, getWorkouts, changeWorkouts } = this.props;

        let formControl = []

        for (var i = 0; i < values.workouts.length; i++) {
            let index = i;
            let workoutSection = <div className="workout-fill-in"><label><IconButton color="primary" icon="close" size={30} name={"removeWorkout:" + i} style={styles.button} onClick={this.removeItem}></IconButton></label>
            <Select name={"workoutType:" + i} style={styles.textfield} onChange={changeWorkouts("workoutType")} value={getWorkouts(index, "workoutType")} variant="outlined">
                <MenuItem value="exercise">Exercise</MenuItem>
                <MenuItem value="break">Break</MenuItem>
            </Select>
            <TextField label="Name of Workout" name={"workoutName:" + i} style={styles.textfield} value={getWorkouts(index, "workoutName")} onChange={changeWorkouts("workoutName")} variant="outlined" />
            <TimeField
                    name={"time:" + i}
                    value={getWorkouts(index, "time")}                     // {String}   required, format '00:00' or '00:00:00'
                    colon=":"
                    onChange={changeWorkouts("time")}
                    showSeconds
                    style={styles.textfield}
                    input={<TextField label="Time for Interval" style={styles.textfield} value={getWorkouts(index, "time")} variant="outlined" />}
                />
                <div className="fileUploadContainer">
                    <input type="file" name={"file:" + i} id={"file" + i} style={{display:"none"}} ref={this.myRef} onChange={this.fileUploadHandler} />
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