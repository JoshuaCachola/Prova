import React, { useState, useEffect } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	// DialogContentText,
	DialogTitle,
	makeStyles,
	FormControl,
	Select,
	InputLabel,
	MenuItem
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils';
import { getMyRoutes } from '../../store/routes';

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

const AddRunForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authorization.currentUser);
  const routes = useSelector((state) => state.routes.routes);
  const [distance, setDistance] = useState(""), //default should be the distance that comes from the route
    [date, setDate] = useState(new Date().toISOString().slice(0, 16)),
    [open, setOpen] = useState(true),
    [route, setRoute] = useState(""),
    [time, setTime] = useState(""),
    [calories, setCalories] = useState("");


	useEffect(
		() => {
			if (currentUser) {
				dispatch(getMyRoutes(currentUser.userId));
			}
		},
		// eslint-disable-next-line
		[ currentUser ]
	);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (e) => {
		setRoute(e.target.value);
		// console.log(e.target);
		// setDistance(routes[e.target.name]);
	};

  const handleSubmit = async e => {
    console.log(date, distance, route, time, calories);
    try {
      const res = await fetch(`${api.url}/users/${currentUser.userId}/runs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          distance,
          routeId: route,
          time,
          calories,
        })
      });

			if (!res.ok) throw res;
		} catch (err) {
			console.error(err);
		}
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

          <FormControl className={classes.formControl}>
            <InputLabel id="routes-input">Routes</InputLabel>
            <Select
              labelId="routes"
              id="routes-select"
              value={route}
              onChange={handleChange}
            >
              {routes &&
                routes.map(({ id }) => <MenuItem key={id} value={id}>Route {id}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="distance"
            label="Distance"
            type="text"
            onChange={e => setDistance(e.target.value)}
            placeholder="X.XX"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="run_duration"
            label="Run duration"
            type="text"
            onChange={e => setTime(e.target.value)}
            placeholder="X'XX"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="calories"
            label="Calories"
            type="text"
            onChange={e => setCalories(e.target.value)}
            placeholder="X.XX"
            fullWidth
          />
          <TextField
            id="datetime-local"
            label="Date and time"
            type="datetime-local"
            defaultValue={date}
            onChange={e => setDate(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            color="primary">
            Run it!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRunForm;
