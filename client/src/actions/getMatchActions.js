import {GET_MATCHES,SET_LOADING,MATCHES_ERROR} from './types';
import axios from 'axios';
export const getMatches=()=> async dispatch => {
    try{
        setLoading();
        const res=await axios.get(`https://api.pandascore.co/matches/upcoming?token=4AUFMvQbjLwRnnuM5NLQqVwj8WPu-wQgNssRZjpV9WDDjnvNI68`);

        dispatch({
            type:GET_MATCHES,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type:MATCHES_ERROR,
            payload:err.response.data
        })
    }
};

//set loading to true
export const setLoading=()=>{
    return {
        type:SET_LOADING
    };
}

export default getMatches