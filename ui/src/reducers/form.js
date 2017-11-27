import * as actions from '../actions'

export default (state = { show: false, schema: {}, uiSchema:{}, data:{}, title: '' }, action) => {
    switch (action.type) {
        case actions.CLOSE_FORM:
            return {
                ...state,
                title: '',
                show: false,
                schema: {},
                uiSchema: {},
                data: {}
            }
        case actions.SHOW_FORM:
            return {
                ...state,
                title: action.title,
                schema: action.schema,
                uiSchema: action.uiSchema,
                data: action.data,
                onSubmit: action.onSubmit,
                show: true
            }
        default:
            return state
    }
}