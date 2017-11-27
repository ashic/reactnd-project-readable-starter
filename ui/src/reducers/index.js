import posts from './posts'
import categories from './categories'
import form from './form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import {combineReducers} from 'redux'

export default combineReducers({posts, categories, form, toastr: toastrReducer})

