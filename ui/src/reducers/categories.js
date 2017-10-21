import * as actions from '../actions'

export default (state = {categories: []}, action) => {
    switch(action.type){
        case actions.CATEGORIES_FETCHED:
            return {
                ...state,
                ...action.categories
            }
        default:
            return state;
    }
}
