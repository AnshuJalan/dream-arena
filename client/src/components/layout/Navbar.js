import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connectWeb3 } from "../../actions/web3Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    backgroundColor: "inherit",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    "&:click": {
      backgroundColor: "inherit",
    },
  },
}));
const Navbar = ({ connectWeb3 }) => {
  useEffect(() => {
    connectWeb3();
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dream Arena
          </Typography>
          <Link to="/matches">
            <Button className={classes.btn}>
              <span style={{ color: "white" }}>Matches</span>
            </Button>
          </Link>
          <Link to="/upcoming">
            <Button className={classes.btn}>
              <span style={{ color: "white" }}>Upcoming</span>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(null, { connectWeb3 })(Navbar);
