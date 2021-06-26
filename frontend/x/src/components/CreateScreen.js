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
import FormLabel from '@material-ui/core/FormLabel';
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
        finalArray.push([])
        var workoutsObject = { workouts: finalArray }

        this.setState(workoutsObject);
        console.log(values.workouts)
    }

    createWorkoutItems = (workoutss) => {
        const { values, fieldChange, time } = this.props;

        let formControl = []

        if (values.workouts == null) {
            let workoutName = <TextField label="Name of Workout" style={styles.textfield} onChange={fieldChange('roomName', 1)} defaultValue={values.RoomName} variant="outlined" />
                formControl.push(workoutName);
                let workoutLength = <TimeField
                                        value={time}                     // {String}   required, format '00:00' or '00:00:00'
                                        onChange={(value) => {fieldChange('time', 1)}}      // {Function} required
                                        colon=":"                        
                                        showSeconds  
                                        style={styles.textfield}
                                        input={<TextField label="Time for Interval" style={styles.textfield} value={time} variant="outlined" />}                         
                                    />
                formControl.push(workoutLength)
                let workoutType = <div className = "formContainer"><FormControl component="fieldset">
                <FormLabel component="legend">Interval Type</FormLabel>
                <RadioGroup aria-label="workoutType" name="private1" value={values.workoutType} onChange={fieldChange('workoutType')}>
                    <FormControlLabel value="exercise" control={<Radio />} label="Exercise" />
                    <FormControlLabel value="break" control={<Radio />} label="Break" />
                </RadioGroup>
                </FormControl></div>
                formControl.push(workoutType)
        } else {
            for(var i=0; i < values.workouts.length + 1; i++) {
                let workoutName = <TextField label="Name of Workout" style={styles.textfield} onChange={fieldChange('roomName')} defaultValue={values.RoomName} variant="outlined" />
                formControl.push(workoutName);
                let workoutLength = <TimeField
                                        value={time}                     // {String}   required, format '00:00' or '00:00:00'
                                        onChange={(value) => {fieldChange('time')}}      // {Function} required
                                        colon=":"                        
                                        showSeconds
                                        style={styles.textfield}
                                        input={<TextField label="Time for Interval" value={time} variant="outlined" />}                      
                                    />
                formControl.push(workoutLength)
                let workoutType = <FormControl component="fieldset">
                <FormLabel component="legend">Interval Type</FormLabel>
                <RadioGroup aria-label="workoutType" name="private1" value={values.workoutType} onChange={fieldChange('workoutType')}>
                    <FormControlLabel value="exercise" control={<Radio />} label="Exercise" />
                    <FormControlLabel value="break" control={<Radio />} label="Break" />
                </RadioGroup>
                </FormControl>
                formControl.push(workoutType)
            }
        }
        let addMore1 = <div><Divider /><br /></div>
        formControl.push(addMore1)
        let addMore = <Button variant="contained" color="secondary" style={styles.button} onClick={this.addNewItem}>Add Exercise</Button>
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