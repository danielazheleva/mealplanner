const express = require('express')
const bodyParser = require('body-parser');
const gcpHelers = require('./services/gcpHelpers')
const recipeService = require('./services/recipeService')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/api/monitor', (req, res) => {
  console.log("Creating Metric");
  gcpHelers.createUserHitMetric('home_page');
});

app.get('/api/recipe', (req, res) => {
  console.log("Hello World!!")
  return ('Hello World!');
})

app.post('/api/recipe', async (req, res) => {
  gcpHelers.createUserHitMetric('recipe_api');

  allScrapedRecipes = await recipeService.combineRecipes(req.body.urls);
  const allRecipesWithServingSizeAndMacros = recipeService.formatRecipe(allScrapedRecipes);
  const allIngredients = recipeService.getShoppingList(allScrapedRecipes);
  
  res.status(200)
    .send(JSON.stringify({ recipes: allRecipesWithServingSizeAndMacros, ingredients: allIngredients }))
    .end();
})

app.listen(port, () => {
  console.log(`Meal Planner API listening at ${port}`)
})