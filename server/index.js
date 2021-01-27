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
  }).map((ing) => {
    // Find ingredient quantity amount (e.g. 100g floud = 100)
    console.log(ing)

    let amount = parseFloat(ing.match(/[\d\.]+/)) 

    // Some ingredients have a space between amount and unit, while some don't
    // This normallises the text to be in the format of "<AMOUNT> <UNIT> <INGREDIENT>"
    if (ing.charAt((ing.lastIndexOf(amount)) + amount.toString().length) != ' ') {
      ing = 
        ing.substring(0, ing.lastIndexOf(amount) + amount.toString().length) 
        + " " 
        + ing.substring(ing.lastIndexOf(amount) + amount.toString().length);
    }
    
    // This finds index of the second empty space after the amount 
    // Which is the first empty space after tha unit e.g. ("100 g flour")
    var index = ing.indexOf(' ', (ing.search(amount) + ((amount.toString().length)+1))); 

    // If there is no second space, then the ingredient has no units (e.g. "2 eggs")
    // So we have to use the first space after the amount number
    if(index == -1 ) index = ing.indexOf(' ', (ing.search(amount))); 

    var amountWithUnit = ing.substr( 0, index );
    var ingredient = ing.substr( index + 1 );

    return ({
    key: ingredient,
    value: amountWithUnit
    })
  });

  console.log(mapOfIngs);
  return mapOfIngs;

  // if 2 ingredients have the same word, then combine

}

function getShoppingList(allRecipes){
    return allIngredientsList = allRecipes.map(function(rec) {
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