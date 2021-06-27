import React, { Component } from 'react';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
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
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import '@ui5/webcomponents/dist/DurationPicker.js';
import DateTimePicker from 'react-datetime-picker'

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

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
    transformless: {
        margin: 10,
        height: '58px',
        textTransform: 'none',
        color: 'white',
        borderColor: "white",
        verticalAlign: "middle"
    },
    textfield: {
        margin: 10,
        color: 'white',
        borderColor: "white",
        verticalAlign: "middle"
    },
    avengers: {
        margin: 10,
        marginTop: 20,
        color: 'white',
        borderColor: "white",
        verticalAlign: "middle",
        float: "right"
    },
    datepicker: {
        margin: 10,
        color: 'white',
        borderColor: "white",
        verticalAlign: "middle",
        fontSize: '30px'
    },
    timepicker: {
        borderStyle: 'solid',
        border: '2px',
        background: "#282c34",
        color: 'white',
        height: '58px'
    }
}

export class CreateScreen extends Component {
    constructor(props) {
        super(props);
        this.myRefs = {};
        this.myRef = React.createRef();
        this.simulateClick = this.simulateClick.bind(this)
    }

    state = {
        workouts: this.props.values.workouts,
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
        var finalArray = this.state.workouts;
        finalArray.push({ title: "", display: "", duration: "00:00:00", seconds: 0, type: "exercise" })
        this.setState({ workouts: finalArray })
        console.log(this.state.workouts)
    }

    removeItem = e => {
        const i = e.currentTarget.name.split(":")[1]
        console.log(i);
        var finalArray = this.state.workouts;
        finalArray.splice(i, 1);
        this.setState({ workouts: finalArray });
        console.log(this.state.workouts)
    }

    changeWorkouts = input => e => {
        var listNumber = e.target.name.split(":")[1]
        const { workouts } = this.state;
        var finalArray = workouts
        if (input == "duration") {
            const seconds = e.target.value.split(':').reduce((sum, current) => {
                return {
                    time: sum.time + current * Math.pow(60, sum.index),
                    index: sum.index - 1,
                }
            }, { time: 0, index: 2 }).time;
            finalArray[listNumber][input] = e.target.value;
            finalArray[listNumber]['seconds'] = seconds;
        } else {
            finalArray[listNumber][input] = e.target.value
        }
        var workoutsObject = { workouts: finalArray }
        this.setState(workoutsObject);
    }

    getWorkouts = (listNumber, input) => {
        const { workouts } = this.state;
        var finalArray = workouts
        return finalArray[listNumber][input]
    }

    uploadEverything = (e) => {
        //Create meeting first
        const { values } = this.props;
        var timestamp = new Date().getUTCMilliseconds();
        var secondPortion = Math.round(Math.random() * 100000000);
        var id = timestamp + secondPortion;
        var timestamp1 = new Date().getUTCMilliseconds();
        var secondPortion1 = Math.round(Math.random() * 10000000);
        var id1 = timestamp1 + secondPortion1;
        const json = JSON.stringify({
            Item: {
                id,
                workout_id: id1,
                name: values.RoomName,
                private: values.privatek
            },
            TableName: 'rooms'
        });
        axios.post('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/rooms', json, {
            headers: {
                'Content-Type': 'application/json'
            },
            onUploadProgress: progressEvent => {
                console.log(Math.round(progressEvent.loaded / progressEvent.total * 100))
            }
        }).then(
            res => {
                console.log(res)
            }
        )

        //Add workouts to meeting
        const json1 = JSON.stringify({ Item: { 'id': id1, 'name': values.WorkoutName, 'workout': this.state.workouts }, TableName: 'workouts' });
        axios.post('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/rooms', json1, {
            headers: {
                'Content-Type': 'application/json'
            },
            onUploadProgress: progressEvent => {
                console.log(Math.round(progressEvent.loaded / progressEvent.total * 100))
            }
        }).then(
            res => {
                console.log(res)
            }
        )
    }

    onFocus = e => {
        if (e.target.name !== "true") {
            e.target.selectionStart = 0;
            e.target.selectionEnd = 0;
        }
        this.updateFocus(e, true)
    }

    updateFocus = (e, state) => {
        e.target.name = state
    }

    parseTime = time => {
        console.log(time)
    }

    uploadEverything = (e) => {
        //Create meeting first
        const { values } = this.props;
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
                console.log(Math.round(progressEvent.loaded / progressEvent.total * 100))
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
                console.log(Math.round(progressEvent.loaded / progressEvent.total * 100))
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
            const json = JSON.stringify({ 'name': e.target.files[0].name, 'data': data });
            axios.post('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/images', json, {
                headers: {
                    'Content-Type': 'application/json'
                },
                onUploadProgress: progressEvent => {
                    console.log(Math.round(progressEvent.loaded / progressEvent.total * 100))
                }
            }).then(
                res => {
                    var listNumber = e.target.name.split(":")[1]
                    var finalArray = this.state.workouts
                    finalArray[listNumber]['display'] = res.data.url
                    this.setState({ workouts: finalArray });
                }
            )
        }.bind(this);
        reader.readAsDataURL(selectedFile);
    }

    simulateClick() {
        this.myRef.current.click();
    }

    simulateClicks(id) {
        this.myRefs[id].current.click();
    }

    populateFields = e => {
        // captain - https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/workouts?id=6261898
        let dictFields = { "ca": '6261898', "bw": "2200164", "im": "194135", "cm": "7488586", "bp": "5495241" }
        axios.get('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/workouts?id=' + dictFields[e.target.value])
            .then((response) => {
                // handle success
                console.log(response);
                let workouts = [];
                response.data.Item.workout.forEach(element => {
                    console.log(element)
                    workouts.push(
                        element
                    )
                })
                this.setState({ workouts: workouts })
            }).catch((err) => {
                let workouts = [];
                err.response.data.Item.workout.forEach(element => {
                    console.log(element)
                    workouts.push(
                        element
                    )
                });
                console.log(workouts);
                this.setState({ workouts: workouts })
            });
    }

    createWorkoutItems = () => {
        const { values, getWorkouts, changeWorkouts } = this.props;

        let formControl = []

        for (let i = 0; i < this.state.workouts.length; i++) {
            let index = i;
            this.myRefs[i] = React.createRef();
            let workoutSection = <div className="workout-fill-in"><label><IconButton color="primary" icon="close" size={30} name={"removeWorkout:" + i} style={styles.button} onClick={this.removeItem}><CloseIcon /></IconButton></label>
                <Select name={"type:" + i} style={styles.textfield} onChange={this.changeWorkouts("type")} value={this.getWorkouts(index, "type")} variant="outlined">
                    <MenuItem value="exercise">Exercise</MenuItem>
                    <MenuItem value="break">Break</MenuItem>
                </Select>
                <TextField label="Name of Workout" name={"title:" + i} style={styles.textfield} value={this.getWorkouts(index, "title")} onChange={this.changeWorkouts("title")} variant="outlined" />
                <TimeField
                    name={"duration:" + i}
                    value={this.getWorkouts(index, "duration")}                     // {String}   required, format '00:00' or '00:00:00'                 // {String}   required, format '00:00' or '00:00:00'
                    colon=":"
                    onChange={this.changeWorkouts("duration")}
                    showSeconds
                    style={styles.textfield}
                    input={<TextField label="Time for Interval" style={styles.textfield} value={this.getWorkouts(index, "duration")} variant="outlined" />}
                />

                <input type="file" name={"file:" + i} id={"file" + i} style={{ display: "none" }} ref={this.myRefs[i]} onChange={this.fileUploadHandler} />
                <label htmlFor={"file" + i}>
                    <Button variant="outlined" size="large" color="primary" style={styles.transformless} onClick={() => this.simulateClicks(i)} startIcon={<CloudUploadIcon />}>Exercise Photo</Button>
                </label>

            </div>
            formControl.push(workoutSection)
        }
        let addMore1 = <div><Divider /><br /></div>
        formControl.push(addMore1)
        let addMore = <div className="bottom-button-holder">
            <Button variant="contained" color="secondary" style={styles.button} onClick={this.addNewItem}>Add Interval</Button>
            <Button variant="contained" color="primary" style={styles.button} onClick={this.uploadEverything}>Create Exercise</Button>
        </div>
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
                            <DateTimePicker value={new Date()} onChange={this.parseTime} style={styles.datepicker} disableClock={true} amPmAriaLabel='test' />
                            <div className="formContainer">
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="private" name="private1" value={values.privatek} onChange={fieldChange('privatek')}>
                                        <FormControlLabel value="public" control={<GreenRadio />} label="Public Meeting" />
                                        <FormControlLabel value="private" control={<GreenRadio />} label="Private Meeting" />
                                    </RadioGroup>
                                </FormControl>
                            </div>

                            <Divider />
                            <h3>Intervals</h3>
                            <Select name={"avengers"} style={styles.avengers} defaultValue="cu" variant="outlined" onChange={this.populateFields}>
                                <MenuItem value="cu">Custom</MenuItem>
                                <MenuItem value="ca">Captain America</MenuItem>
                                <MenuItem value="bw">Black Widow</MenuItem>
                                <MenuItem value="im">Iron Man</MenuItem>
                                <MenuItem value="cm">Captain Marvel</MenuItem>
                                <MenuItem value="bp">Black Panther</MenuItem>
                            </Select>
                            <WorkoutCards
                                createWorkoutItems={this.createWorkoutItems}
                                workouts={this.state.workouts}
                            />
                        </div>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default CreateScreen