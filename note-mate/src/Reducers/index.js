
const initialState = [
    {
        Title: 'First Note',
        Text: 'Here is your first note. Feel free to edit or delete this note.'
    }
]


const noteReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }

}

export default noteReducer;