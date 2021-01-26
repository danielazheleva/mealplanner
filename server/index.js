const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const scrapers = require('./scraper');

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/recipe', (req, res) => {
  return ('Hello World!');
})

app.post('/recipe', async (req, res) => {
  console.log(req.body);

  let allRecipes =  [];
  
  // This scrapes each recipe in the list and combines the info in one big list 
  for (let url of req.body.urls) {
    if (url != null && url != "") {
      const scrapedRecipe = await scrapeRecipe(url);
      allRecipes.push(scrapedRecipe);
    } else {
      console.log("url empty");
    }
  };

  //Get list of all ingredients in all recipes
  const allIngredients = getShoppingList(allRecipes);

  reduceShoppingList(allIngredients);

  res.send(JSON.stringify(allIngredients));
})

// input: list of all ingredients from allrecipes
function reduceShoppingList(allIngredients) {
  // map list into map of ingredient: amount
  const mapOfIngs = allIngredients.map(ingredient => {
    if(ingredient.includes(",")) ingredient = ingredient.split(',')[0];
    ingredient.trim();
    return ingredient;
  }).map((ingredient) => {
    // Find ingredient quantity 
    const amount = parseFloat(ingredient.match(/[\d\.]+/)) // 100

    if (amount == NaN || amount == "") return ({key: ingredient, value: "not found"})
  
    if (ingredient.charAt((ingredient.lastIndexOf(amount)) + amount.toString().length) != ' ') {
      ingredient = 
        ingredient.substring(0, ingredient.lastIndexOf(amount) + amount.toString().length) 
        + " " 
        + ingredient.substring(ingredient.lastIndexOf(amount) + amount.toString().length);
    }
    

    
    return ({
    key: ingredient.split(amount.toString()),
    value: amount.toString()
    })
  });

  console.log(mapOfIngs);
// if 2 ingredients have the same word, then combine

}

function getShoppingList(allRecipes){
    return allIngredients = allRecipes.map(function(rec) {
        return rec['ingredients'];
    })
    .reduce((r, arr) => r.concat(arr), []);

}

async function scrapeRecipe(url) {
  console.log("Scraping Recipe: " + url);
  const recipe = await scrapers.scrapeRecipe(url);
  return recipe;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})