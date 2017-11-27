import React from 'react'
import _ from 'lodash'
import { Panel, Row, Col, Grid, Button } from 'react-bootstrap'
import Voter from '../voter'
import CommentCount from './comment-count'
import {Link} from 'react-router-dom'
import * as actions from '../../actions'

const ListItem = ({ id, category, title, author, voteScore, comments, deleted, onEdit, onDelete }) => ( !deleted && 
    <li key={id} className='post-list-item'>
        <Panel>
            <Grid fluid>
                <Row>
                    <Link to={`/${category}/${id}`}><h3>{title}</h3></Link>
                </Row>
                <Row>
                    <Col>{author}</Col>
                    <Col mdOffset={10} className='control'>
                        <Voter voteScore={voteScore} id={id} onVote={actions.votePost} />
                        <CommentCount count={comments} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button bsSize='xsmall' className='btn-raised' onClick={() => onEdit && onEdit(id)}><span className='glyphicon glyphicon-edit'></span></Button>
                        <Button bsSize='xsmall' bsStyle='danger' className='btn-raised' onClick={()=> onDelete && onDelete(id)}><span className='glyphicon glyphicon-remove'></span></Button>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    </li>
)


export default ({ postSummaries, onEdit, onDelete }) => (
    <ul className='post-list'>
        {_.map(postSummaries, p => <ListItem key={p.id} {...p} onEdit={id => onEdit(id)} onDelete={id => onDelete(id)} />)}
    </ul>
)