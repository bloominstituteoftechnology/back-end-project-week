import {USER, USER_INFO} from '../actions/';

const initialStateT = {
    userName: '',
    user: [],
    token: '',
    user_info: []
};

export const users_reducer = (state = initialStateT, action) => {
    switch (action.type) {
        case USER:
            return {...state,
                        userName: action.user_name,
                        user: action.payload,
                        token: action.token
                    };
        case USER_INFO:
            console.log('payload::', action.payload);
            return {...state, user_info: action.payload};
        default:
            return state;
    }
};
