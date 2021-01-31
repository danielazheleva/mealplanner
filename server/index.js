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

// FINAL JSON TO RETURN TO US
// {
//   "recipes": [
//     {
//       "recipe_name": "abc",
//       "servings": 2,
//       "macros_per_servinc": [
//         {
//           "protein": 45,
//           "carbs": 32,
//           "fats": 4
//         }
//       ]
//     }
//   ],
//   "shopping_list": [
//      {
//        "ingredient": "",
//        "amount": 45,
//        "unit": "g"
//      }
//   ]
// }

app.post('/recipe', async (req, res) => {
  console.log(req.body);

  let allRecipes =  [];
  
  // This scrapes each recipe in the list and combines the info in one big list 
  for (let url of req.body.urls) {
    if (url.url != null && url.url != "") {
      const scrapedRecipe = await scrapeRecipe(url.url);
      allRecipes.push(scrapedRecipe);
    } else {
      console.log("url empty");
    }
  };  
  // TODO - work out how many multiples of recipe is required before combining ingredients into one list

  //Get list of all ingredients in all recipes
  const allRecipesWithServingSizeAndMacros = formatRecipe(allRecipes);
  const allIngredients = getShoppingList(allRecipes);
  res.send(JSON.stringify({recipes: allRecipesWithServingSizeAndMacros, ingredients: allIngredients}));
})

// input: list of all recipes, containing all information
function formatRecipe(allRecipes) {
  const wantedKeys = ['recipeName', 'servings', 'formattedMacros']
  const output = [];
  
  allRecipes.forEach(recipe => {
    const filtered = Object.keys(recipe).filter(key => wantedKeys.includes(key))
                                        .reduce((obj, key) => {
                                          obj[key] = recipe[key];
                                          return obj;
                                        }, {});
    output.push(filtered)
  })
  return output;
}

// input: list of all recipes, containing all information
function reduceShoppingList(allRecipes) {
  // map list into map of ingredient: amount
  const mapOfIngs = allRecipes.map(ingredient => {
    if(ingredient.includes(",")) ingredient = ingredient.split(',')[0];
    ingredient.trim();
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
    var index = ing.indexOf(' ', (indexAfterAmountNum+1)); 

    // If there is no second space, then the ingredient has no units (e.g. "2 eggs")
    // So we have to use the first space after the amount number
    if(index == -1 ) index = ing.indexOf(' ', (ing.search(amount))); 

    var amountWithUnit = ing.substr( 0, index );
    var ingredient = ing.substr( index + 1 );

    return ({
    key: ingredient.trim(),
    value: amount,
    unit: amountWithUnit.split(" ")[1]
    })
  });

  return mapOfIngs;

  // if 2 ingredients have the same word, then combine

}

function combineDuplicates(arrayOfObjects){
  
  var combined = [];

  arrayOfObjects.forEach(obj => {

    if(combined.some(combinedObj => combinedObj.key == obj.key)) {
      combined.forEach(finalIng => {
        if( (finalIng.key == obj.key) && (finalIng.unit == obj.unit ) ) {
          finalIng.value += obj.value;
        }
      })
    } else {
      combined.push(obj);
    }
  });

  // console.log("===== final objects  =====")
  // console.log(combined)

  return combined;
  
}

function getShoppingList(allRecipes){
    const allIngredientsList = allRecipes.map(function(rec) {
        return rec['ingredients'];
    })
    .reduce((r, arr) => r.concat(arr), []);

    const allList = reduceShoppingList(allIngredientsList);
    return combineDuplicates(allList);
}

async function scrapeRecipe(url) {
  console.log("Scraping Recipe: " + url);
  const recipe = await scrapers.scrapeRecipe(url);
  return recipe;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})