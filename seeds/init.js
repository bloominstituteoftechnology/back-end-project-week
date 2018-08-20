
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      const notes = [ { title: 'Week 1 - UI',
      content: 'CSS Selectors  - Specifically the weight of a selector.\n\nLearned the more specific the element is the more weight it will have, which will end up rendering it to the screen.\n\nHere\'s the order of operations\n* < elements < classes, psuedo-classes, attributes < IDs < inline styles < !important\n\nFlexbox and how much it rocks!\n\nKey ideas\n- main axis, cross axis\n-justify-content, etc\n\nGit\n- fork, clone, commit, push\n' },
    { title: 'Week2 - Responsive',
      content: 'Preprocessors - LESS\n\nUsing rems - for fonts\nUsing % based layouts\nUsing media queries\n\nCommand to watch / compiles LESS files:\n-less-watch-compiler less css index.less\n\n'},
    { title: 'Week3 - JS',
      content: 'Variables\n- let, const\nArrays - type of data structure for lists\nObjects - Everything in JS is an object\nFunctions - First class citizens\nCallbacks - functions that do something after another function completes\nScope - how long an entity persists on the stack\nClosures \nPrototype - Type of inheritance opposed to classical\n\n\n' },
    { title: 'Week4 - JS II',
      content: '- DOM \n- DOM Selectors\n\n- Listeners\n\n- Event Propagation\n\n- Components' },
    { title: 'Week5 - Project Week - User Interface',
      content: 'The modal took some time to figure out.\n\nAdding GSAP to the close button was pretty cool.\n\nGetting the sub-headers to line up wasn\'t too easy.. got to get better at CSS.\n\n' },
    { title: 'Week6 - React',
      content: 'A UI library\n\nComponents - the foundation to building UI\n- functional vs classical components\n- stateless vs stateful components\n- presentational vs container components\n- dumb vs smart components\n\nJSX to render components\n\nProp vs State and how to pass data dynamically\n\n' },
    { title: 'Week7 - React II',
      content: 'Lifecycle methods\n- constructor\n-componentDidMount\n-render\n\nHOC\n- These are basically composite functions from math, except instead of functions they are components\n\nDesign Patterns\n- State driven development' },
    { title: 'Week8 - SPA',
      content: 'React Router\n- Router - Wrapper for the App\n- Route - specifies a route for a page with a path for the URL\n- Link - specifies a link with a to field for which route it should go to\n\nHTTP/AJAX\n- CRUD\n\nAXIOS\n- library to make async calls with returned promises' },
    { title: 'Week9 - Redux',
      content: 'Mutability\n- primatives vs array methods\n-Store, actions, reducers and dispatchers\n\nAsync Redux\n- Redux Thunk - middleware from handling async ops in Redux' },
    { title: 'Week10 - Project Week - Front End',
      content: 'This week, we took a project from just a design file and used React to create it.\n\nIn this project, the following libraries were used\n    "bootstrap": "^4.1.2",\n    "react": "^16.4.1",\n    "react-dom": "^16.4.1",\n    "react-router-dom": "^4.3.1",\n    "react-scripts": "1.1.4",\n    "react-transition-group": "^2.4.0",\n    "reactstrap": "^6.3.0",\n    "styled-components": "^3.3.3"\n\nThe best part was making the data persistent in Firebase!' } ]

        
        return knex('notes').insert(notes);
      });
};
