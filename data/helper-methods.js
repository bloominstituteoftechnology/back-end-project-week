const knex = require('knex');
const dbEngine = process.env.DB || 'development';
const knexConfig = require('../knexfile.js')[dbEngine];
const db = knex(knexConfig);

const getNotes =()=>{
    return db("note");
}

const getNote = (id) =>{
  if(id) {
    return db('note')
        .where({id})
        .first();
  } else {
      return db('note');
  }
}

// getShoppingList method working!!!
// const getShoppingList = (recipeId) =>{
//   if(recipeId) {
//     return db('unit')
//         .join('ingredient-unit', 'ingredient-unit.unit_id', '=', 'unit.id')
//         .join('ingredient','recipe-ingredient.recipe_id', '=', 'ingredient-unit.ingredient_id')
//         .join('recipe-ingredient', 'recipe-ingredient.ingredient_id', '=', 'ingredient.id')
//         .join('recipe','recipe.id','=','recipe-ingredient.recipe_id')
//         .where('recipe.id', recipeId)
//         .select(
//           {ingredient: 'ingredient.name'},
//           'ingredient.amount',
//           {unit: 'unit.name'}
//         );    
//   } else {
//       return db('dish');
//   }
// }

const addNote = (note) =>{
    return db
          .insert(note)
          .into('note');
}

const deleteNote = (id) =>{
  if(id) {
    return db('note')
        .where({id})
        .del();
  } else {
      return db('note');
  }
}

const updateNote = (id, newNote) =>{
  if(id) {
    return db('note')
          .update(newNote)
          .where({id})
  } else {
      return db('note');
  }
}


module.exports = {
  getNotes,
  getNote,
  addNote,
  deleteNote,
  updateNote
};