import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Grid from "@material-ui/core/Grid"
import Avt from "../layout/AvatarImg"
export const Match = ({match}) => {
    const res=match.name.split(" ");
    return (
        <div>
            {/* <img src={match.league.image_url} alt='' style={{width:'60px',borderRadius:"50%"}}/> */}
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={4} >
                    {
                        match.opponents.length!=0 && match.opponents[0].opponent.image_url ?
                            <Avt link={match.opponents[0].opponent.image_url} letter={null} index={0}/>:
                            <Avt link={null} letter={res[0][0]} index={0}/>

                    }
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    {
                        match.opponents.length>0 && match.opponents[1] && match.opponents[1].opponent.image_url ?
                            <Avt link={match.opponents[1].opponent.image_url} letter={null} index={1}/>:
                            <Avt link={null} letter={res[res.length-1][0]} index={1}/>

                    }
                </Grid>
                <Grid item xs={12}>
                    <h5>{match.name}</h5>
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
