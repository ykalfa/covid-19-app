import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Buttons() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button>Cases</Button>
          <Button>Recovered</Button>
          <Button>Deaths</Button>
        </ButtonGroup>
      </div>
    )
}

export default Buttons;
