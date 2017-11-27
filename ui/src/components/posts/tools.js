import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap'
import _ from 'lodash'
import { LinkContainer } from 'react-router-bootstrap'
import {connect} from 'react-redux'
import * as actions from '../../actions'

const onSort = (item, dispatch) => 
    dispatch(actions.sortPosts(item))

export default connect(null)(({ categories, selected, dispatch }) => (
    <div>
        <Navbar inverse fluid>
            <Nav>
                <NavDropdown title="Category" id='posts-by-category'>
                    <LinkContainer to='/'>
                        <MenuItem>all</MenuItem>
                    </LinkContainer>
                    {
                        _.map(categories, c => (
                            <LinkContainer key={c.path} to={`/${c.path}`}>
                                <MenuItem>{c.name}</MenuItem>
                            </LinkContainer>
                        ))
                    }
                </NavDropdown>
                <NavDropdown onSelect={item => onSort(item, dispatch)} title='Sort by' id='sort-order'>
                    <MenuItem eventKey={"timestamp"}>Date</MenuItem>
                    <MenuItem eventKey={"voteScore"}>Score</MenuItem>
                </NavDropdown>
                <NavItem onSelect={() => dispatch(actions.showNewPostForm(categories))}><span className='glyphicon glyphicon-plus'></span></NavItem>
            </Nav>
        </Navbar>
        <Panel>
            { !selected && <span>Showing all posts.</span>}
            { selected && <span>Showing posts for {selected}.</span>}
        </Panel>
    </div>
))