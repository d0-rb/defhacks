import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 600,
        margin: 'auto'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        margin: 15,
    },
    textfield: {
        margin: 10,
    },
    formControl: {
        margin: 15,
        minWidth: 240,
    },
});

export default function BuildPublicList(props) {
    const classes = useStyles();
    const { rooms, setAppState } = props;

    let items = [];

    const goToRoom = (room) => () => {
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

    if (rooms.length === 0) {
        items.push(<div className="cant-load">
            <ListItem button>
                <ListItemText primary="Sorry! Can't Find Any :(" />
            </ListItem>
            <Divider />
        </div>)
    } else {
        rooms.forEach((room) => {
            items.push(<div className="loaded-item">
                <ListItem button onClick={goToRoom(room)}>
                    <ListItemText primary={room.name} />
                </ListItem>
                <Divider />
            </div>)
        })
    }

    return (
        <div className="itemWrapper">
            {items}
        </div>
    );
}