import React, { Component } from 'react';
import CreateScreen from "./CreateScreen";
import InitialScreen from "./InitialScreen";
import VideoScreen from "./VideoScreen";
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
        PrivateKeyCode: '',
        workouts: [{ title: "", display: "", duration: "00:00:00", seconds: 0, type: "exercise"}],
        Name: '',
        RoomName: '',
        WorkoutName: '',
        privatek: '',
        rooms: [],
    }

    constructor(props) {
        super();
        axios.get('https://kfx9j387v5.execute-api.us-east-1.amazonaws.com/alpha/rooms?TableName=rooms')
            .then((response) => {
                // handle success
                var rooms = [];
                response.data.Items.forEach(element => {
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

    joinMeeting = () => {
        this.setState({
            step: 3
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

    changeWorkouts = input => e => {
        var listNumber = e.target.name.split(":")[1]
        const { workouts } = this.state;
        var finalArray = workouts
        finalArray[listNumber][input] = e.target.value
        var workoutsObject = { workouts: finalArray }
        this.setState(workoutsObject);
    }

    getWorkouts = (listNumber, input) => {
        const { workouts } = this.state;
        var finalArray = workouts
        return finalArray[listNumber][input]
    }

    render() {
        const { step, PrivateKeyCode, Name, workouts, time, workoutType, RoomName, WorkoutName, privatek, rooms } = this.state;
        const values = { PrivateKeyCode, Name, rooms };
        const values2 = { Name, workouts, time, workoutType, RoomName, WorkoutName, privatek };

        switch (step) {
            case 1:
                return (
                    <InitialScreen
                        joinMeeting={this.joinMeeting}
                        createMeeting={this.createMeeting}
                        fieldChange={this.fieldChange}
                        values={values}
                        rooms={rooms}
                    />
                )
            case 2:
                return (
                    <CreateScreen
                        fieldChange={this.fieldChange}
                        workouts={this.workouts}
                        values={values2}
                        time={time}
                        changeWorkouts={this.changeWorkouts}
                        getWorkouts={this.getWorkouts}
                    />
                )
            case 3:
                return <VideoScreen
                    submitPage={this.submitPage}
                />
            default:
        }
    }
}

export default Home