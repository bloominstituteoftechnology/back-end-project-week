import {USER} from '../actions/';

const initialStateT = {
    userName: '',
    user: [],
    token: '',
};

export const users_reducer = (state = initialStateT, action) => {
    switch (action.type) {
        case USER:
            console.log('action.user_name::', action.user_name);
            return {...state,
                        userName: action.user_name,
                        user: action.payload,
                        token: action.token
                    };
        default:
            return state;
    }
};
