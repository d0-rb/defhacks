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
        workouts: [],
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

    changeWorkouts = (e, item, listNumber) => {
        var dictSimple={"roomName": 0, "time": 1, "workoutType": 2, "gif": 3}
        const { workouts } = this.state;
        var finalArray = workouts
        finalArray[listNumber][dictSimple[item]] = e.target.value
        var workoutsObject = { workouts: finalArray }

        this.setState(workoutsObject);
    }

    render() {
        const { step,PrivateKeyCode, Name, KeyCode, workouts, time, workoutType } = this.state;
        const values = { PrivateKeyCode, Name };
        const values2 = { Name, KeyCode,  workouts, time, workoutType};
        
        switch(step) {
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
                        prevQuestion={this.prevQuestion}
                        nextQuestion={this.nextQuestion}
                        nextForm={this.nextForm}
                        prevForm={this.prevForm}
                        fieldChange={this.fieldChange}
                        workouts={this.workouts}
                        values={values2}
                        time={time}
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
