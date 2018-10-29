const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const getNotes =()=>{
    return db("dish");
}

const getRecipes =()=>{
  return db("recipe");
}

const getDish = (id) =>{
  if(id) {
    return db('dish')
        .where({id})
        .first();
  } else {
      return db('dish');
  }
}

// getShoppingList method working!!!
const getShoppingList = (recipeId) =>{
  if(recipeId) {
    return db('unit')
        .join('ingredient-unit', 'ingredient-unit.unit_id', '=', 'unit.id')
        .join('ingredient','recipe-ingredient.recipe_id', '=', 'ingredient-unit.ingredient_id')
        .join('recipe-ingredient', 'recipe-ingredient.ingredient_id', '=', 'ingredient.id')
        .join('recipe','recipe.id','=','recipe-ingredient.recipe_id')
        .where('recipe.id', recipeId)
        .select(
          {ingredient: 'ingredient.name'},
          'ingredient.amount',
          {unit: 'unit.name'}
        );    
  } else {
      return db('dish');
  }
}

const addDish = (dish) =>{
    return db
          .insert(dish)
          .into('dish');
}

const addRecipe = (recipe) =>{
  return db.insert(recipe)
            .into('recipe');
}

module.exports = {
  getNotes,
  getDish,
  addDish,
  getRecipes,
  addRecipe,
  getShoppingList
};