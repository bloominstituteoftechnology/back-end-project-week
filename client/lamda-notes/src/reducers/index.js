import { DELETE_NOTE, EDIT_NOTE, CREATE_NOTE } from "../actions";

const intialState = {
  notes: [
    {
      title: "Note 1",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223451,
      _id: "1829384841"
    },

    {
      title: "Note 2",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223452,
      _id: "1829384842"
    },
    {
      title: "Note 3",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223453,
      _id: "1829384843"
    },
    {
      title: "Note 4",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223454,
      _id: "1829384844"
    },
    {
      title: "Note 5",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223455,
      _id: "1829384845"
    },
    {
      title: "Note 6",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223456,
      _id: "1829384846"
    },
    {
      title: "Note 7",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223457,
      _id: "1829384847"
    },
    {
      title: "Note 8",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223458,
      _id: "1829384848"
    },
    {
      title: "Note 9",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at maximus nisi, ut pulvinar odio. Duis faucibus nisl pien auctor vulputate. Aenean ullamcorper viverra est, in iaculis lacus feugiat nec. Aenean volutpat, urna non imperdiet ullamcorper, orci mi consequat ex, vitae ullamcorper nisi risus quis odio. Etiam interdum tellus gittis interdum. Morbi vel felis arcu. Phasellus eu ex nulla. Nullam ultrices velit ismod bibendum.",
      createdAt: 9223459,
      _id: "1829384849"
    }
  ],
  error: null
};

const notesReducer = (state = initialState, action) => {
  //works great for getting rid of an element inside of an array without mutating the state/array
  let temp = Array.from(state); //shallow copy of state to not mutate state
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

export default notesReducer;
