import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connectWeb3 } from "../../actions/web3Actions";
import { Paper } from "@material-ui/core";

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
const Navbar = ({ connectWeb3, network }) => {
  useEffect(() => {
    connectWeb3();
  }, []);

  const loc = useLocation().pathname;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        style={{ backgroundColor: "#303030" }}
        elevation={loc === "/" ? 0 : 1}
      >
        <div style={{ width: "90%", margin: "auto" }}>
          <Toolbar>
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
                justify: "center",
              }}
              variant="h6"
              className={classes.title}
            >
              <img
                style={{ marginRight: "15px" }}
                width="28"
                alt="brand"
                src={process.env.PUBLIC_URL + "/images/brand.svg"}
              />
              <Link style={{ color: "white" }} to="/">
                DREAM ARENA
              </Link>
            </Typography>
            <Link to="/matches">
              <Button
                style={
                  loc.includes("matches")
                    ? {
                        backgroundColor: "#4aedc4",
                        color: "black",
                        marginRight: "10px",
                      }
                    : { marginRight: "10px", color: "white" }
                }
                className={classes.btn}
              >
                <span>Matches</span>
              </Button>
            </Link>
            <Link to="/upcoming">
              <Button
                style={
                  loc.includes("upcoming")
                    ? { backgroundColor: "#4aedc4", color: "black" }
                    : { color: "white" }
                }
                className={classes.btn}
              >
                <span>Upcoming</span>
              </Button>
            </Link>
            <Paper
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px 12px",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              {network !== 42 && network !== 80001 ? (
                "CHECKING NETWORK.."
              ) : (
                <>
                  {" "}
                  <span
                    style={{
                      color: network === 42 ? "#7700ff" : "#5DD395",
                      fontSize: "18px",
                      marginRight: "10px",
                    }}
                    className="material-icons"
                  >
                    fiber_manual_record
                  </span>
                  {network === 42 ? (
                    <img
                      src={process.env.PUBLIC_URL + "/images/eth.png"}
                      width="32"
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/images/matic.png"}
                      width="32"
                      style={{ marginRight: "3px" }}
                    />
                  )}{" "}
                  {network === 42 ? "ETHEREUM KOVAN" : "MATIC NETWORK"}{" "}
                </>
              )}
            </Paper>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    network: state.ethereum.network,
  };
};

export default connect(mapStateToProps, { connectWeb3 })(Navbar);
