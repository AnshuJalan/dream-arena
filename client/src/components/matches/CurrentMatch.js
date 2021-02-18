import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Avt from "../layout/AvatarImg";

const Match = ({ match }) => {
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

  if (apiData === null) return <p>Loading...</p>;

  console.log(apiData);

  return (
    <div>
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={4}>
          {apiData.opponents.length != 0 &&
          apiData.opponents[0].opponent.image_url ? (
            <Avt
              link={apiData.opponents[0].opponent.image_url}
              letter={null}
              index={0}
            />
          ) : (
            <Avt
              link={null}
              letter={apiData.opponents[0].opponent.name[0]}
              index={0}
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          {apiData.opponents.length > 0 &&
          apiData.opponents[1] &&
          apiData.opponents[1].opponent.image_url ? (
            <Avt
              link={apiData.opponents[1].opponent.image_url}
              letter={null}
              index={1}
            />
          ) : (
            <Avt
              link={null}
              letter={apiData.opponents[0].opponent.name[0]}
              index={1}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <h5>{apiData.name}</h5>
        </Grid>
        <Grid item xs={12}>
          <h5>{match.admin}</h5>
        </Grid>
      </Grid>
      {/* <Link to={`/user/${login}`} className='btn btn-dark'>More</Link>
            <br></br>
            <br></br> */}
    </div>
  );
};

Match.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Match;
