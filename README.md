# mealplanner
## Workflow

1. user puts multiple recipe url in form + number of servings they want from each
2. Scraper pulls all data for each recipe
    - servings it makes 
    - macros
    - ingredients list 
3. Calculate shopping list to satisfy all recipes and servings.
4. Drag and drop recipes into week table and output macros 

## Todo
- [x] Send recipe from front end form to backend handler
- [x] Pass each recipe to scraper to get data
- [x] Combine repeat ingredients from multiple recipes to show total value on shopping list
- [x] Combine ingredients list for weekly shopping list
- [x] Display shopping list in UI
- [x] How to set each recipe per meal?
- [x] Calculate daily macros once you know which recipes are on which day
- [x] Deploy to GCP 
- [ ] Look at DNS name
- [x] Set up monitoring on GCP
- [ ] Work out how to add tests
- [x] Calculate if recipe needs to be multiplied (up or down) based on recipe serving vs user need
- [x] Calculate new amount of ingredients per recipe (for those that need to be multiplied)
- [x] Add loading icon while scraper is working 
- [x] Refresh list of recipes after multiple submits
<<<<<<< HEAD
- [ ] Refactor 
=======
- [ ] Change console logging to actual logging (info/debug/warn)
- [ ] Look at how to do user monitoring properly
- [ ] Improve scanner logic. Is there a better way to get info without using xpath to prevent breaking when BBC changes website?
- [ ] Show an error when scraper errors
- [ ] Show 'wrong url' message if incorrect url 
>>>>>>> a020b8abbbf5b526de19f251559a8b61ac9a79cd
