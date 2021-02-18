import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ImageAvatars({link,letter,index}) {
  const classes = useStyles();
  let array=[]
  array.push("#ff2e2e");
  array.push("#3877ff")
  return (
    <div style={{alignItems:"center",justifyContent:"center"}} className={classes.root}>
      {
        link ? <Avatar alt="Remy Sharp" src={link} className={classes.large} variant="rounded"/>
          : <Avatar className={classes.large} style={{backgroundColor:array[index],color:"white",fontSize:"1.5rem"}} variant="rounded">{letter}</Avatar>
      }
    </div>
  );
}