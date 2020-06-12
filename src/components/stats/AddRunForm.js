import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles
} from '@material-ui/core';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AddRunForm = () => {
  const [distance, setDistance] = useState(0.00), //default should be the distance that comes from the route
    [time, setTime] = useState(0),
    [date, setDate] = useState(Date.now().toString()),
    [open, setOpen] = useState(true);

  useEffect(() => {

  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = date => {
    setDate(date);
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a run</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="distance"
            label="Distance"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="run_duration"
            label="Run duration"
            type="text"
            fullWidth
          />
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Run it!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRunForm;
