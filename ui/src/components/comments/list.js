import React from 'react'
import {Panel} from 'react-bootstrap'
import _ from 'lodash'
import Voter from '../voter'
import * as actions from '../../actions'

const Comment = ({id, author, body, voteScore}) => (

    <Panel>
        <h5>{author}</h5>
        <Voter id={id} voteScore={voteScore} onVote={actions.voteComment} />
        <hr />
        <p>
            {body}
        </p>
    </Panel>
)

export default ({comments}) => (
    <div>
        {
            _.map(comments, c => <Comment key={c.id} {...c} />)            
        }
    </div>
)