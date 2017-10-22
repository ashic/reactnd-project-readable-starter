import React from 'react'
import _ from 'lodash'
import { Panel, Row, Col, Grid, Button } from 'react-bootstrap'
import Voter from '../voter'
import CommentCount from './comment-count'
import {Link} from 'react-router-dom'
import * as actions from '../../actions'

/*Listed posts are displayed with 
title, 
author, 
number of comments, 
current score, 
and a voting mechanism to upvote or downvote the post. 
Posts should have buttons or links for editing or deleting that post.


All posts for a category are listed at /:category

List pages (root or category) include a mechanism for sorting by date or by score (at a minimum) and the sort works properly

*/

const ListItem = ({ id, category, title, author, voteScore, comments, deleted }) => ( !deleted && 
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
                        <Button bsSize='xsmall' className='btn-raised'><span className='glyphicon glyphicon-edit'></span></Button>
                        <Button bsSize='xsmall' bsStyle='danger' className='btn-raised'><span className='glyphicon glyphicon-remove'></span></Button>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    </li>
)


export default ({ postSummaries }) => (
    <ul className='post-list'>
        {_.map(postSummaries, p => <ListItem key={p.id} {...p} />)}
    </ul>
)