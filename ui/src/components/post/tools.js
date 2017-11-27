
import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, MenuItem, Panel, NavItem } from 'react-bootstrap'
import _ from 'lodash'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { NavLink } from 'react-router-dom';

export default connect(null)(({ categories, selected, dispatch, onEdit, onCreate, onDelete }) => (
    <div>
        <Navbar inverse fluid className='post-nav-bar'>
            <NavLink to='/'>
                <span className="glyphicon glyphicon-home"></span>
            </NavLink>
            <NavLink to='#' onClick={ ()=>onEdit && onEdit() }>
                <span className="glyphicon glyphicon-edit"></span>
            </NavLink>
            <NavLink to='#' onClick={ ()=> onDelete && onDelete() }>
                <span className="glyphicon glyphicon-remove"></span>
            </NavLink>
            <NavLink to='#' onClick={ () => onCreate && onCreate() }>
                <span className="glyphicon glyphicon-plus"></span>
            </NavLink>

        </Navbar>
    </div>
))