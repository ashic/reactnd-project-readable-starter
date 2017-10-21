import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'


const onChange = (dispatch, postId, option) => 
    dispatch(actions.votePost(postId, option))

const voter = ({ voteScore, postId, dispatch }) => (
    <span className='vote-score'>
        <span>
            {voteScore}
        </span>&nbsp;
        <span className="glyphicon glyphicon-thumbs-up" onClick={() => onChange(dispatch, postId, "upVote")}></span>
        <span className="glyphicon glyphicon-thumbs-down" onClick={() => onChange(dispatch, postId, "downVote")}></span>
    </span>
)

export default connect((x, p) => p)(voter)