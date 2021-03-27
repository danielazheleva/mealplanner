const gcpHelpers = require('../services/gcpHelpers');
const recipeService = require('../services/recipeService');

function get(req, res) {
    const { limit = 50, skip = 0 } = req.query;
    console.log("Hello World!!")
    return res.json("Hello World!!");
}

async function scrapeRecipe(req, res, next) {
    gcpHelpers.createUserHitMetric('recipe_api');

    allScrapedRecipes = await recipeService.combineRecipes(req.body.urls);
    const allRecipesWithServingSizeAndMacros = recipeService.formatRecipe(allScrapedRecipes);
    const allIngredients = recipeService.getShoppingList(allScrapedRecipes);

    res.status(200)
        .send(JSON.stringify({ recipes: allRecipesWithServingSizeAndMacros, ingredients: allIngredients }))
        .end();
}

module.exports = {
    get, scrapeRecipe
};