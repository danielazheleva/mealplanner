const express = require('express')
const bodyParser = require('body-parser');
const scrapers = require('./services/scraper');
const gcpHelers = require('./services/gcpHelpers')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// input: list of all recipes, containing all information
function formatRecipe(allRecipes) {
  const wantedKeys = ['recipeName', 'servings', 'formattedMacros']
  const output = [];  

  allRecipes.forEach(map => {
    recipe = map.scrapedRecipeDetail;
    multiplyer = map.amount;

    const filtered = Object.keys(recipe).filter(key => wantedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = recipe[key];
        return obj;
      }, {});
    filtered.servings = filtered.servings * multiplyer;
    output.push(filtered)
  })
  return output;
}

// input: list of all recipes, containing all information
function formatIngredients(allRecipes, multiplyer) {
  // map list into map of ingredient: amount
  const mapOfIngs = allRecipes.map(ingredient => {
    if (ingredient.includes(",")) ingredient = (ingredient.split(',')[0]).trim();
    return ingredient;
  }).map((ing) => {
    // Find ingredient quantity amount (e.g. 100g floud = 100)
    let amount = parseFloat(ing.match(/[\d\.]+/))
    const indexAfterAmountNum = ing.search(amount) + amount.toString().length;

    // Some ingredients have a space between amount and unit, while some don't
    // This normallises the text to be in the format of "<AMOUNT> <UNIT> <INGREDIENT>"
    if (ing.charAt(indexAfterAmountNum) != ' ') {
      ing =
        ing.substring(0, indexAfterAmountNum)
        + " "
        + ing.substring(indexAfterAmountNum);
    }

    // This finds index of the second empty space after the amount 
    // Which is the first empty space after tha unit e.g. ("100 g flour")
    var index = ing.indexOf(' ', (indexAfterAmountNum + 1));

    // If there is no second space, then the ingredient has no units (e.g. "2 eggs")
    // So we have to use the first space after the amount number
    if (index == -1) index = ing.indexOf(' ', (ing.search(amount)));

    var amountWithUnit = ing.substr(0, index);
    var ingredient = ing.substr(index + 1);

    return ({
      key: ingredient.trim(),
      value: (amount*multiplyer),
      unit: amountWithUnit.split(" ")[1]
    })
  });

  return mapOfIngs;
}

function combineDuplicates(arrayOfObjects) {
  console.log("==============")
  console.log(arrayOfObjects);
  console.log("==============")

  var combined = [];

  arrayOfObjects.forEach(obj => {
    console.log(obj)
    if (combined.some(combinedObj => combinedObj.key == obj.key)) {
      combined.forEach(finalIng => {
        if ((finalIng.key == obj.key) && (finalIng.unit == obj.unit)) {
          finalIng.value += obj.value;
        }
      })
    } else {
      combined.push(obj);
    }
  });

  return combined;
}

function getShoppingList(allRecipes) {

  var rawShoppingList = [];

  allRecipes.forEach((recipe) => {
    const recipeIngredients = recipe.scrapedRecipeDetail.ingredients;
    const multiplyer = recipe.amount;

    const formattedIngredientsForRecipe = formatIngredients(recipeIngredients, multiplyer);
    formattedIngredientsForRecipe.forEach((ing) => {
      rawShoppingList.push(ing);
    })
  })

  return combineDuplicates(rawShoppingList);
}

async function scrapeRecipe(url) {
  console.log("Scraping Recipe: " + url);
  const recipe = await scrapers.scrapeRecipe(url);
  return recipe;
}

app.listen(port, () => {
  console.log(`Meal Planner API listening at ${port}`)
})