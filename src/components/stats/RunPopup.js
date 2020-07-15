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
  },
  header: {
    borderBottom: '1px solid #949494'
  },
  bold: {
    fontWeight: 'bold'
  }
}));

const AddRunForm = ({ run, runId }) => {
  const showRunPopup = useSelector(({ runs }) => runs.showRunPopup);
  const currentUser = useSelector((state) => state.authorization.currentUser);
  const [satisfied, setSatisfied] = useState(0);

  const dispatch = useDispatch()

  const handleClose = () => {
    const newPopupObj = { ...showRunPopup };
    newPopupObj[runId] = !newPopupObj[runId];
    dispatch(handleShowRunPopup(newPopupObj));
    dispatch(getRuns(currentUser.userId));
  };

  const handleRatingChange = async e => {
    const rating = e.target.id;
    const userId = currentUser.userId;
    try {
      let res = await fetch(`${api.url}/users/${userId}/runs/${runId}`, {
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
    setSatisfied(parseInt(rating));
  };

  useEffect(() => {
    setSatisfied(run.rating);
  }, [run.rating]);

  const classes = useStyles();
  return (
    <div id="popup">
      <Dialog open={showRunPopup[runId]} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.header}>{run.name}</DialogTitle>
        <DialogContent>
          <h3>{convertDateToDay(run)}</h3>
          <div>
            <img src={run.static_map} alt="static map" />
          </div>
          <Box mt={2} display="flex" flexDirection="column">
            <Box pb={2} display="flex" justifyContent="space-between">
              <div className={classes.bold}>Distance</div>
              <div>{run.distance.toFixed(2)} mi</div>
            </Box>
            <Box pb={2} display="flex" justifyContent="space-between">
              <div className={classes.bold}>Pace</div>
              <div>{((run.time / 60) / run.distance).toFixed(2)} min/mi</div>
            </Box>
            <Box pb={2} display="flex" justifyContent="space-between">
              <div className={classes.bold}>Time</div>
              <div>{(run.time / 60).toFixed(0)}"{(run.time % 60)}""</div>
            </Box>
          </Box>
          <Container className={classes.ratingHeader}>
            <h3>How was your run?</h3>
          </Container>
          <Box display="flex" justifyContent="space-evenly">
            <InsertEmoticonIcon
              id="1"
              className={satisfied === 1 ? classes.iconSelected : classes.icons}
              fontSize="large"
              onClick={handleRatingChange}
            />
            <SentimentSatisfiedIcon
              id="2"
              className={satisfied === 2 ? classes.iconSelected : classes.icons}
              fontSize="large"
              onClick={handleRatingChange}
            />
            <SentimentVeryDissatisfiedIcon
              id="3"
              className={satisfied === 3 ? classes.iconSelected : classes.icons}
              fontSize="large"
              onClick={handleRatingChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            color="secondary"
            size="small"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRunForm;
