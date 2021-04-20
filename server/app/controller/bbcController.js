const gcpHelpers = require('../services/gcpHelpers');
const recipeService = require('../services/recipeService');

function get(req, res) {
    const { limit = 50, skip = 0 } = req.query;
    gcpHelpers.createUserHitMetric('hello_world');
    return res.json("Hello World!!");
}

async function scrapeRecipe(req, res, next) {
    gcpHelpers.createUserHitMetric('recipe_api');

    try {
        allScrapedRecipes = await recipeService.combineRecipes(req.body.urls);
        const allRecipesWithServingSizeAndMacros = recipeService.formatRecipe(allScrapedRecipes);
        const allIngredients = recipeService.getShoppingList(allScrapedRecipes);
        gcpHelpers.createUserHitMetric('recipe_api_success');

        res.status(200)
            .send(JSON.stringify({ recipes: allRecipesWithServingSizeAndMacros, ingredients: allIngredients }))
            .end();
    } catch (error) {
        gcpHelpers.createUserHitMetric('recipe_api_fail');

        res.status(400)
        .send(JSON.stringify("Recipe is not from BBC GoodFood"))
        .end();
    }

    
}

module.exports = {
    get, scrapeRecipe
};