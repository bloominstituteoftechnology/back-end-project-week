import { DELETE_NOTE, EDIT_NOTE, CREATE_NOTE } from '../actions';

const initialState = [
    {
        _id: "slkjljkljlkjlk3jlk1jkj3lkjl1j",
        title: "First Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 1527536455211,
    }, 
    {
        _id: "slkjlj44444444444444444444l11j",
        title: "Second Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 1527536455212,
    }, 
    {
        _id: "slkjlj44444449944444444444l0j",
        title: "Third Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 1527536455213,
    }, 
    {
        _id: "slk3333jlj44422444444444444444l5j",
        title: "Forth Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 1527536455214,
    },
    {
        _id: "slkjlj44444449997779944444l9j",
        title: "Fifth Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 15275364552115
    },
    {
        _id: "slkjlj11144444444444444444l1j",
        title: "Six Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 1527536455216,
    },
    {
        _id: "slkjlj4444444444444777777444nn2j",
        title: "Seventh Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 1527536455217,
    },
    {
        _id: "slkjlj44546456464444vv4444l3j",
        title: "Eigth Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 1527536455218,
    },
    {
        _id: "slkjlj44444989898989444444444l3j",
        title: "Ninth Note", 
        body: " Roof party kombucha migas woke bespoke forage master cleanse health goth semiotics selfies bushwick coloring book. 3 wolf moon tbh raclette meh pok pok before they sold out. Kinfolk distillery twee, taiyaki blog knausgaard hell of chambray yr. Cold-pressed small batch snackwave you probably haven't heard of them, mlkshk shaman meggings tbh poutine heirloom. Celiac mixtape unicorn intelligentsia echo park keffiyeh. Edison bulb you probably haven't heard of them pitchfork locavore, microdosing kickstarter mlkshk distillery iPhone mixtape franzen four loko yuccie. Green juice retro waistcoat woke.", 
        createdAt: 1527536455219,
    }
];
// Current Application State, {action object}

const notesReducer = (state = initialState, action) => {
    //works great for getting rid of an element inside of an array without mutating the state/array
    let temp = Array.from(state); //shallow copy of state to not mutate state
    switch(action.type) {
        case 'DELETE_NOTE':
            state.forEach((item, index) => {
               if (item._id === action.payload) {
                   temp.splice(index, 1);
                   return;
               }
            });
            return temp;
        case 'EDIT_NOTE':
                state.forEach((item, index) => {
                if (item._id === action.payload._id) {
                    temp.splice(index, 1);
                    return;
                }
                });
                temp.push(action.payload);
                return temp;
        case 'CREATE_NOTE': 
                temp.push(action.payload);
                return temp;
        default: 
        // Returns: The next Application State
            return state;

    }
};

export default notesReducer; //and pull into index.js outside of src folder




