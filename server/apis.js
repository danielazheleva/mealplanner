

app.get('/api/monitor', (req, res) => {
    console.log("Creating Metric");
    gcpHelers.createUserHitMetric('home_page');
});

app.get('/api/recipe', (req, res) => {
    console.log("Hello World!!")
    return ('Hello World!');
})

app.post('http://localhost:3000/api/recipe', async (req, res) => {
    gcpHelers.createUserHitMetric('recipe_api');
    console.log(req.body);

    let allRecipes = [];

    // This scrapes each recipe in the list and combines the info in one big list 
    for (let url of req.body.urls) {
        if (url.url != null && url.url != "") {
            const scrapedRecipe = await scrapeRecipe(url.url);
            console.log(scrapedRecipe)
            allRecipes.push(scrapedRecipe);
        } else {
            console.log("url empty");
        }
    };
    // TODO - work out how many multiples of recipe is required before combining ingredients into one list

    //Get list of all ingredients in all recipes
    const allRecipesWithServingSizeAndMacros = formatRecipe(allRecipes);
    const allIngredients = getShoppingList(allRecipes);
    res.status(200)
        .send(JSON.stringify({ recipes: allRecipesWithServingSizeAndMacros, ingredients: allIngredients }))
        .end();
})