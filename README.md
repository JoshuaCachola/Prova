# Prova

*Need a way to manage your runs? Let Prova help keep you on track to meet your running goals*

[Live](https://prova-run.herokuapp.com)

### Created By:
- Alan Li
- Joshua Cachola
- Mark Mansolino

## Project Description
Prova is a running platform where users' can create running routes and keep track of their progress on these routes. Our app provides clear verbal and visual representations of the route ensuring accurate directions. When a user finishes a route they can update the distance they ran along with the total amount of time it took to update their total progress.

### App Feature Screenshots
#### Dashboard
![Prova-dashboard](https://media.giphy.com/media/S4Bln9msfQOjZhPQmz/giphy.gif)

#### Create a route
![Prova-create-a-route](https://media.giphy.com/media/W03O7rOagoE0V80j8c/giphy.gif)

#### Create a run
![Prova-create-a-run](https://media.giphy.com/media/IgFKabDBwakb4uCwTI/giphy.gif)

#### Rate your run
![Prova-rate-run](https://media.giphy.com/media/JpYnyAJjOFhHSGIrJJ/giphy.gif)

#### Graph representation of running progress
![Prova-graph](https://media.giphy.com/media/kagCkUWxyOkpQYdML7/giphy.gif)

#### Route management
![Prova-routes](https://media.giphy.com/media/j31O6MoSYU7q5ix8Cq/giphy.gif)

- Feature List: [Github](/documentation/feature-list.md)
- Backend Repo Link: [Prova-backend](https://github.com/JoshuaCachola/Prova-backend)
- Link to App - deployed on heroku: [Prova-run](https://prova-run.herokuapp.com)
- Database schema - [Github](https://github.com/JoshuaCachola/Prova-backend/blob/master/documentation/feature-packet/Prova-schema.png)

## Technologies used
- Python
- JavaScript
- Flask
- React
- Redux
- PostgreSQL
- Material UI
- Auth0
- Docker

## Code Highlights

#### Conditionally updating best time and average time for a route

```python
# When a user saves a run, find the route associated with it
route_for_run = Route.query.filter(Route.id == new_run.route_id).first()

# If the time of the run is less than the current best time, update the best time. Otherwise, leave it as it is.
if not route_for_run.best_time:
    route_for_run.best_time = new_run.time
elif new_run.time < route_for_run.best_time:
    route_for_run.best_time = new_run.time
route_for_run.total_number_of_runs += 1 # Either way, the total number of runs for the route is incremented
  
# Calculate a new average time for the run
if not route_for_run.average_time:
    route_for_run.average_time = new_run.time
else:
    new_average = (route_for_run.average_time * (route_for_run.total_number_of_runs -
                                                     1) + new_run.time) / route_for_run.total_number_of_runs
    route_for_run.average_time = new_average
    
db.session.add(route_for_run) # Add the route to the session to be saved in the database
```
