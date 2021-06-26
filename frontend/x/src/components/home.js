import React, { Component } from 'react';
import CreateScreen from "./CreateScreen";
import InitialScreen from "./InitialScreen";
import VideoScreen from "./VideoScreen";

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
        workouts: [["", "00:00:00", "", ""]],
        Name: '',
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
    }

    changeWorkouts = input => e => {
        var listNumber = e.target.name[e.target.name.length - 1];
        var dictSimple = { "workoutName": 0, "time": 1, "workoutType": 2, "gif": 3 }
        const { workouts } = this.state;
        var finalArray = workouts
        finalArray[listNumber][dictSimple[input]] = e.target.value
        var workoutsObject = { workouts: finalArray }

        this.setState(workoutsObject);
    }

    getWorkouts = (listNumber, input) => {
        var dictSimple = { "workoutName": 0, "time": 1, "workoutType": 2, "gif": 3 }
        const { workouts } = this.state;
        var finalArray = workouts
        console.log(listNumber)
        console.log(dictSimple[input])
        console.log(finalArray[listNumber][dictSimple[input]])
        return finalArray[listNumber][dictSimple[input]]
    }

    render() {
        const { step, PrivateKeyCode, Name, workouts, time, workoutType } = this.state;
        const values = { PrivateKeyCode, Name };
        const values2 = { Name, workouts, time, workoutType };

        switch (step) {
            case 1:
                return (
                    <InitialScreen
                        joinMeeting={this.joinMeeting}
                        createMeeting={this.createMeeting}
                        fieldChange={this.fieldChange}
                        values={values}
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