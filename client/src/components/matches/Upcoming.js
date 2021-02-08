import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import Match from './Match';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import {getMatches} from '../../actions/getMatchActions';

export const Upcoming = ({matches:{matches,loading},getMatches}) => {
    useEffect(()=>{
        getMatches();
        //eslint-disable-next-line
    },[]);

    if(loading || matches===null){
        return <Preloader/>;
    }
    return (
        <div className="collection">
            <div className="collection">
                <h4 className="center">Upcoming Matches</h4>
            </div>
            <div style={userStyle}>
                {!loading && matches.length===0? (<p className="center">No Matches to show....</p>):(
                    matches.map(match => <Match match={match}/>)
                )}
            </div>
            

        </div>
    )
}

const userStyle={
    display:'grid',
    gridTemplateColumns:'repeat(3, 5fr)',
    gridGap:'3 rem'
}

Upcoming.propTypes={
    matches:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    matches:state.matches
})

export default connect(mapStateToProps,{getMatches})(Upcoming);
