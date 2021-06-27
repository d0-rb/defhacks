import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
    const { rooms } = props;

    let items = [];

    if (rooms.length === 0) {
        items.push(<div class = "cant-load">
            <ListItem button>
                <ListItemText primary="Sorry! Can't Find Any :(" />
            </ListItem>
            <Divider />
        </div>)
    } else {
        rooms.forEach((room) => {
            items.push(<div class = "loaded-item">
                <ListItem button>
                    <ListItemText primary={room.name} />
                </ListItem>
                <Divider />
            </div>)
        })
    }

    return (
        <div class = "itemWrapper">
            {items}
        </div>
    );
}