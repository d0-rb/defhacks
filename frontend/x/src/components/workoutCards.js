import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

export default function WorkoutCards(props) {
    const classes = useStyles();
    const { createWorkoutItems } = props;

    return (
        <div className="all-workouts">
            {createWorkoutItems()}
        </div>
    );
}