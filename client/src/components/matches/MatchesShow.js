import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Avatar,
  Button,
  TextField,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { getContractMatch, getBets } from "../../actions/matchesActions";
import axios from "axios";
import Preloader from "../layout/Preloader";

const MatchesShow = ({
  matches,
  getContractMatch,
  contract,
  account,
  getBets,
  betsA,
  betsB,
}) => {
  const { id } = useParams();

  const [apiData, setApiData] = useState(null);
  const [teamSelected, setTeamSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [betAmount, setBetAmount] = useState();

  useEffect(() => {
    (async () => {
      if (contract) {
        await getContractMatch(id);
        await getBets(id);
      }
    })();
  }, [id, getContractMatch, contract, getBets]);

  const match = matches[id];

  useEffect(() => {
    if (match) {
      (async () => {
        const res = await axios.get(match.apiUrl);
        setApiData(res.data);
      })();
    }
  }, [match, setApiData]);

  if (!match || !apiData) {
    return <Preloader />;
  }

  const bet = async () => {
    try {
      setLoading(true);
      await contract.methods.bet(match.id, teamSelected).send({
        value: parseInt(betAmount * 10 ** 18),
        from: account,
      });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  const getImageSection = (team) => {
    const opp = apiData.opponents[team].opponent;
    const colors = ["#ff2e2e", "#3877ff"];
    const avatarStyle = {
      width: "196px",
      height: "196px",
      backgroundColor: colors[team],
      fontSize: "72px",
      color: "#ffffff",
      cursor: "pointer",
    };
    const borderStyle = {
      padding: teamSelected === team ? "5px" : "10px",
      border: teamSelected === team ? `5px ${colors[team]} dashed` : "none",
    };
    let avatar;
    if (!opp.image_url) {
      avatar = (
        <div onClick={() => setTeamSelected(team)} style={borderStyle}>
          <Avatar variant="rounded" style={avatarStyle}>
            {opp.name[0]}
          </Avatar>
        </div>
      );
    } else {
      avatar = (
        <div onClick={() => setTeamSelected(team)} style={borderStyle}>
          <Avatar variant="rounded" style={avatarStyle} src={opp.image_url} />
        </div>
      );
    }

    return (
      <React.Fragment>
        {avatar}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "196px",
            marginTop: "20px",
          }}
        >
          <span style={{ fontSize: "18px" }}>{opp.name}</span>
          <span style={{ fontSize: "21px", fontWeight: "bold" }}>
            {team === 0 ? match.oddsA / 100 : match.oddsB / 100}
          </span>
        </div>
      </React.Fragment>
    );
  };

  const getTable = () => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Team</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Odds</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ETH</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(betsA).map((key, index) => (
            <TableRow key={index}>
              <TableCell>{apiData.opponents[0].opponent.name}</TableCell>
              <TableCell>{key / 100}</TableCell>
              <TableCell>{(betsA[key] / 10 ** 18).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          {Object.keys(betsB).map((key, index) => (
            <TableRow key={index}>
              <TableCell>{apiData.opponents[1].opponent.name}</TableCell>
              <TableCell>{key / 100}</TableCell>
              <TableCell>{(betsB[key] / 10 ** 18).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Grid style={{ height: "100%" }} container spacing={2}>
      <Grid style={gridItemStyle} item container xs={8}>
        <Card style={cardStyle}>
          <CardHeader title={<h5 style={cardHeader}>PLACE BET</h5>} />
          <CardContent style={{ height: "100%" }}>
            <Grid style={{ height: "65%" }} container spacing={2}>
              <Grid style={gridItemStyle} item xs={5} container>
                {getImageSection(0)}
              </Grid>
              <Grid item xs={2} style={gridItemStyle} container>
                VS
              </Grid>
              <Grid item xs={5} style={gridItemStyle} container>
                {getImageSection(1)}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Bet Amount in ETH"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={bet}
                  style={{
                    backgroundColor: "#357a38",
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                  fullWidth
                >
                  {loading ? (
                    <CircularProgress size={24} style={{ color: "white" }} />
                  ) : (
                    "PLACE BET"
                  )}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid style={gridItemStyle} item container xs={4}>
        <Card style={cardStyle}>
          <CardHeader title={<h5 style={cardHeader}>YOUR BETS</h5>} />
          <CardContent
            style={{
              padding: "2px 15px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "83%",
            }}
          >
            {getTable()}
            <Button
              style={{ fontWeight: "bold" }}
              color="secondary"
              variant="contained"
              disabled
              fullWidth
            >
              WITHDRAW PAYOUT
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const cardHeader = { fontWeight: "bold", margin: "0px", fontSize: "18px" };
const cardStyle = { height: "95%", width: "100%" };
const gridItemStyle = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  justifyContent: "center",
  flexDirection: "column",
};

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    contract: state.ethereum.contract,
    account: state.ethereum.account,
    betsA: state.bets.betsA,
    betsB: state.bets.betsB,
  };
};

export default connect(mapStateToProps, { getContractMatch, getBets })(
  MatchesShow
);
