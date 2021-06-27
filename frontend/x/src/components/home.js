import React, { Component } from 'react';
import CreateScreen from "./CreateScreen";
import InitialScreen from "./InitialScreen";
import axios from "axios";

const styles = {
    button: {
        margin: 15,
    },
    textfield: {
        margin: 10,
        color: 'white',
        borderColor: "white",
    }
}

export class Home extends Component {
    state = {
        step: 1,
        workouts: [{ title: "", display: "", duration: "00:00:00", seconds: 0, type: "exercise"}],
        privatek: '',
        rooms: [],
    }

    /*state = {
        step: 1,
        workouts: [{ title: "", display: "", duration: "00:00:00", seconds: 0, type: "exercise"}],
        Name: '',
        RoomName: '',
        WorkoutName: '',
        privatek: '',
        rooms: [],
    }*/

    constructor(props) {
        super();
    }

    componentDidMount = () => {
        axios.get('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/rooms?TableName=rooms')
            .then((response) => {
                // handle success
                console.log(response);
                var rooms = [];
                response.data.Items.forEach(element => {
                    console.log(element)
                    if(element.private == "public") {
                        rooms.push(
                            element
                        )
                    }
                })
                this.setState({
                    rooms,
                });
            });
    }

    createMeeting = () => {
        this.setState({
            step: 2
        });
    }

    fieldChange = input => e => {
        this.setState({
            [input]: e.target.value
        })
        console.log(this.state);
    }

    fieldChangeMaster = input => e => {
        const { setAppState } = this.props;

        setAppState({
            [input]: e.target.value
        });
    }

    changeWorkouts = input => e => {
        var listNumber = e.target.name.split(":")[1]
        const { workouts } = this.state;
        var finalArray = workouts
		
        if(input == "duration"){
            const seconds = e.target.value.split(':').reduce((sum, current) => {
                return {
                    time: sum.time + current * Math.pow(60, sum.index),
                    index: sum.index - 1,
                }
            }, { time: 0, index: 2 }).time;
            finalArray[listNumber][input] = e.target.value;
            finalArray[listNumber]['seconds'] = seconds;
        }else {
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

    goBack = () => {
        this.setState({
            step: 1,
        })
    }

    render() {
        const { step, PrivateKeyCode, workouts, workoutType, WorkoutName, privatek, rooms } = this.state;
        const { roomName: RoomName, displayName: Name, setAppState } = this.props;
        const values = { PrivateKeyCode, Name, rooms };
        const values2 = { Name, workouts, workoutType, RoomName, WorkoutName, privatek };

        switch (step) {
            case 1:
                return (
                    <InitialScreen
                        createMeeting={this.createMeeting}
                        fieldChange={this.fieldChange}
                        fieldChangeMaster={this.fieldChangeMaster}
                        setAppState={setAppState}
                        values={values}
                        rooms={rooms}
                    />
                )
            case 2:
                return (
                    <CreateScreen
                        fieldChange={this.fieldChange}
                        fieldChangeMaster={this.fieldChangeMaster}
                        goBack={this.goBack}
                        setAppState={setAppState}
                        workouts={this.workouts}
                        values={values2}
                        changeWorkouts={this.changeWorkouts}
                        getWorkouts={this.getWorkouts}
                    />
                )
            default:
        }
    }
}

export default Home