import * as actionTypes from '../actions/actionTypes';
const istate = {
    user: {},
    users: []
}

function userReduceer(state = istate, action) {
    switch (action.type) {
        case actionTypes.ADD__USER:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case actionTypes.READ__USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}
export default userReduceer;