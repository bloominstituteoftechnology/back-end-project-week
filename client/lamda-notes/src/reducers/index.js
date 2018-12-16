import { DELETE_NOTE, EDIT_NOTE, CREATE_NOTE } from "../actions";

const body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum"

const initialState = {
  notes: [
    {
      title: "Note 1",
      body:
        "",
      createdAt: 9223451,
      _id: "1829384841"
    },
  ]
};

export const notesReducer = (state = initialState, action) => {
  let temp = Array.from(state);
  switch (action.type) {
    case "DELETE_NOTE":
      state.forEach((item, index) => {
        if (item._id === action.payload) {
          temp.splice(index, 1);
          return;
        }
      });
      return temp;
    case "EDIT_NOTE":
      state.forEach((item, index) => {
        if (item._id === action.payload._id) {
          temp.splice(index, 1);
          return;
        }
      });
      temp.push(action.payload);
      return temp;
    case "CREATE_NOTE":
      temp.push(action.payload);
      return temp;
    default:
      return state;
  }
};


