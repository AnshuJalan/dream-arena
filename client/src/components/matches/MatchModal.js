import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import Avt from "../layout/AvatarImg";

const MatchModal = ({ open, setCreateModalOpen, match }) => {
  const getImage = (team) => {
    const opp = match.opponents[team].opponent;

    return (
      <div>
        {opp.image_url ? (
          <Avt link={opp.image_url} letter={null} index={team} />
        ) : (
          <Avt link={null} letter={opp.name[0]} index={team} />
        )}
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>{opp.name}</span>
      </div>
    );
  };

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

  const classes = useStyles();

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={() => setCreateModalOpen(false)}
    >
      <div style={modalStyle}>
        <span style={{ fontWeight: "bold", fontSize: "18px", padding: "5px" }}>
          CREATE MATCH
        </span>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={5}>
              {getImage(0)}
            </Grid>
            <Grid item xs={2}>
              VS
            </Grid>
            <Grid item xs={5}>
              {getImage(1)}
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" fullWidth label="Odds Team A" />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" fullWidth label="Odds Team B" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Initial Margin" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth color="primary">
                CREATE MATCH
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "20%",
  margin: "auto",
  backgroundColor: "#424242",
  width: "50%",
  height: "58%",
  padding: "10px",
};

export default MatchModal;
