Server for Backwoods Tracker

## Deployment

We deploy to Heroku: https://backwoods-tracker.herokuapp.com/

_Note:_ Make sure you set the environment variables in the Heroku dashboard! `MONGO_URI` should be our production database.

To deploy, cd into the server folder and run these commands:

```bash
$ git init
$ git remote add heroku https://git.heroku.com/backwoods-tracker.git
```

Double check that your remote is working by running `git remote -v`. You should see heroku pointing to our app on Heroku.

Pushing is easy, just do `git push heroku master`.
