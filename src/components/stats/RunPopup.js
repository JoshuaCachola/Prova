import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Container,
  Box
} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils';
import { handleShowRunPopup, getRuns } from '../../store/runs';
import { convertDateToDay } from '../../utils/convert-date';

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
  },
  ratingHeader: {
    textAlign: 'center'
  },
  icons: {
    color: '#949494',
    cursor: 'pointer',
    '&:hover': {
      color: '#FFD700'
    }
  },
  iconSelected: {
    color: '#FFD700'
  }
}));

const AddRunForm = ({ run, runId }) => {
  const showRunPopup = useSelector(({ runs }) => runs.showRunPopup);
  const currentUser = useSelector((state) => state.authorization.currentUser);
  const dispatch = useDispatch()

  const handleClose = () => {
    const newPopupObj = { ...showRunPopup };
    newPopupObj[runId] = !newPopupObj[runId];
    dispatch(handleShowRunPopup(newPopupObj));
  };

  const handleRatingChange = async e => {
    const rating = e.target.id;
    const userId = currentUser.userId;
    try {
      let res = await fetch(`${api.url}/users/${currentUser.userId}/runs/${runId}`, {
        method: 'PUT',
        body: JSON.stringify({ rating }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw res;
      }
    } catch (err) {
      console.error(err);
    }
    dispatch(getRuns(userId));
  };

  console.log(run);
  const classes = useStyles();
  return (
    <div>
      <Dialog open={showRunPopup[runId]} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{run.name}</DialogTitle>
        <DialogContent>
          <h3>{convertDateToDay(run)}</h3>
          <div>
            <img src={run.static_map} alt="static map" />
          </div>
          <Container className={classes.ratingHeader}>
            <h3>How was your run?</h3>
          </Container>
          <Box display="flex" justifyContent="space-evenly">
            <InsertEmoticonIcon
              id="1"
              className={run.rating === 1 ? classes.iconSelected : classes.icons}
              fontSize="large"
              onClick={handleRatingChange}
            />
            <SentimentSatisfiedIcon
              id="2"
              className={run.rating === 2 ? classes.iconSelected : classes.icons}
              fontSize="large"
              onClick={handleRatingChange}
            />
            <SentimentVeryDissatisfiedIcon
              id="3"
              className={run.rating === 3 ? classes.iconSelected : classes.icons}
              fontSize="large"
              onClick={handleRatingChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRunForm;
