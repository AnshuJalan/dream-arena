import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
export const Match = ({match}) => {
    return (
        <div>
            {/* <img src={match.league.image_url} alt='' style={{width:'60px',borderRadius:"50%"}}/> */}
            <h5>{match.name}</h5>
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
