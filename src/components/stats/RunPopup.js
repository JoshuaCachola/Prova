import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils';
import { handleShowRunPopup } from '../../store/runs';
import { convertDate, convertDateToDay } from '../../utils/convert-date';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

const AddRunForm = ({ run, runId }) => {
  const showRunPopup = useSelector(({ runs }) => runs.showRunPopup);
  const dispatch = useDispatch()

  const handleClose = () => {
    const newPopupObj = { ...showRunPopup };
    newPopupObj[runId] = !newPopupObj[runId];
    dispatch(handleShowRunPopup(newPopupObj));
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog open={showRunPopup[runId]} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Route</DialogTitle>
        <DialogContent>
          <img src={run.static_map} alt="static map" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRunForm;
