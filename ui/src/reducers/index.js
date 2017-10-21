import posts from './posts'
import categories from './categories'
import { reducer as toastrReducer } from 'react-redux-toastr'
import {combineReducers} from 'redux'

export default combineReducers({posts, categories, toastr: toastrReducer})

