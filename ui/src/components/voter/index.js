import React from 'react'
import {connect} from 'react-redux'


const onChange = (dispatch, id, option, onVote) => 
    onVote && dispatch(onVote(id, option))

const voter = ({ voteScore, id, dispatch, onVote }) => (
    <span className='vote-score'>
        <span>
            {voteScore}
        </span>&nbsp;
        <span className="glyphicon glyphicon-thumbs-up" onClick={() => onChange(dispatch, id, "upVote", onVote)}></span>
        <span className="glyphicon glyphicon-thumbs-down" onClick={() => onChange(dispatch, id, "downVote", onVote)}></span>
    </span>
)

export default connect((x, p) => p)(voter)