import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Button } from "@material-ui/core";
import Avt from "../layout/AvatarImg";
import "../../App.css";
import Preloader from "../layout/Preloader";

const MatchCard = ({ match }) => {
  const [apiData, setApiData] = useState(null);

  const { apiUrl } = match;

  useEffect(() => {
    (async () => {
      const config = {
        method: "get",
        url: `${apiUrl}`,
      };
      const res = await axios(config);
      setApiData(res.data);
    })();
  }, [apiUrl]);

  const getDetails = (team) => {
    const opp = apiData.opponents[team].opponent;

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

  if (apiData === null) return <Preloader />;

  return (
    <div>
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={5}>
          {getDetails(0)}
        </Grid>
        <Grid item xs={2}>
          VS
        </Grid>
        <Grid item xs={5}>
          {getDetails(1)}
        </Grid>
        <Grid item xs={12}>
          <Paper
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#505050",
              padding: "8px",
            }}
            elevation={0}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                style={{ fontSize: "20px", marginRight: "5px" }}
                class="material-icons"
              >
                casino
              </span>
              <span
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >{`${match.oddsA / 100} : ${match.oddsB / 100}`}</span>
              <span
                style={{
                  fontSize: "20px",
                  marginLeft: "25px",
                  marginRight: "5px",
                }}
                class="material-icons"
              >
                account_balance
              </span>
              <span style={{ fontSize: "15px" }}>
                {match.totalCollection} ETH
              </span>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Link to={`/matches/${match.id}`}>
            <Button
              style={{
                backgroundColor: "#357a38",
                color: "#ffffff",
                fontWeight: "bold",
              }}
              variant="contained"
              fullWidth
            >
              PLACE BET
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

MatchCard.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MatchCard;
