import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Grid from "@material-ui/core/Grid"
import Avt from "../layout/AvatarImg"
export const Match = async ({match}) => {
      const config = {
        method: "get",
        url:
          `${match.apiUrl}`,
      };
    const res=await axios(config);
    console.log(res.data);
    return (
        <div>
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={4} >
                    {
                        res.data.opponents.length!=0 && res.data.opponents[0].opponent.image_url ?
                            <Avt link={res.data.opponents[0].opponent.image_url} letter={null} index={0}/>:
                            <Avt link={null} letter={res[0][0]} index={0}/>

                    }
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    {
                        res.data.opponents.length>0 && res.data.opponents[1] && res.data.opponents[1].opponent.image_url ?
                            <Avt link={res.data.opponents[1].opponent.image_url} letter={null} index={1}/>:
                            <Avt link={null} letter={res[res.length-1][0]} index={1}/>

                    }
                </Grid>
                <Grid item xs={12}>
                    <h5>{res.data.name}</h5>
                </Grid>
                <Grid item xs={12}>
                    <h5>{match.admin}</h5>
                </Grid>

            </Grid>
            {/* <Link to={`/user/${login}`} className='btn btn-dark'>More</Link>
            <br></br>
            <br></br> */}
        </div>
    )
}

Match.propTypes={
    match:PropTypes.object.isRequired
  }

export default Match
