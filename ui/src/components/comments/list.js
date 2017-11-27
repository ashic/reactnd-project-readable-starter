import React from 'react'
import { Panel, Button } from 'react-bootstrap'
import _ from 'lodash'
import Voter from '../voter'
import * as actions from '../../actions'

const Comment = ({ id, author, body, voteScore, onEdit, onDelete }) => (

    <Panel>
        <h5>{author}</h5>
        <Voter id={id} voteScore={voteScore} onVote={actions.voteComment} />&nbsp;
        <Button bsSize='xsmall' className='btn-raised' onClick={ () => onEdit({id, body}) }><span className='glyphicon glyphicon-edit'></span></Button>
        <Button bsSize='xsmall' bsStyle='danger' className='btn-raised' onClick={ ()=> onDelete(id) }><span className='glyphicon glyphicon-remove'></span></Button>
        <hr />
        <p>
            {body}
        </p>
    </Panel>
)

export default ({ comments, onEdit, onDelete }) => (
    <div>
        {
            _.map(comments, 
                c => <Comment key={c.id} {...c} 
                onEdit={ data => onEdit && onEdit(data) } 
                onDelete = {id => onDelete && onDelete(id)} />)
        }
    </div>
)