# mealplanner

## Workflow

1. user puts multiple recipe url in form + number of servings they want from each

2. Scraper pulls all data for each recipe
    - servings it makes 
    - macros (for later)
    - ingredients list 

3. Calculate shopping list to satisfy all recipes and servings.


## Todo
- [x] Send recipe from front end form to backend handler
- [x] Pass each recipe to scraper to get data
- [ ] Calculate if recipe needs to be multiplied (up or down) based on recipe serving vs user need
- [ ] Calculate new amount of ingredients per recipe (for those that need to be multiplied)
- [x] Combine repeat ingredients from multiple recipes to show total value on shopping list
- [ ] Work out how to add tests
- [x] Combine ingredients list for weekly shopping list
- [x] Display shopping list in UI
- [x] How to set each recipe per meal?
- [x] Calculate daily macros once you know which recipes are on which day