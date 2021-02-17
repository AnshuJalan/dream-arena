import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Match from "./Match";
import Preloader from "../layout/Preloader";
import PropTypes from "prop-types";
import { getMatches } from "../../actions/apiActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const Upcoming = ({ api: { matches, loading }, getMatches }) => {
  const classes = useStyles();
  useEffect(() => {
    getMatches();
    //eslint-disable-next-line
  }, []);

  if (loading || matches === null) {
    return <Preloader />;
  }

  return (
    <div className={classes.root}>
      <h4 className="center">Upcoming Matches</h4>
      <Grid container spacing={3}>
        {!loading && matches.length === 0 ? (
          <p className="center">No Matches to show....</p>
        ) : (
          matches.map((match) => (
            <Grid item xs={6}>
              <Paper className={classes.paper} elevation={2}>
                <Match match={match} />
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

Upcoming.propTypes = {
  api: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  api: state.api,
});

export default connect(mapStateToProps, { getMatches })(Upcoming);
