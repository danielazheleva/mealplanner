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
- [ ] Set up monitoring on GCP
- [ ] Work out how to add tests
- [ ] Calculate if recipe needs to be multiplied (up or down) based on recipe serving vs user need
- [ ] Calculate new amount of ingredients per recipe (for those that need to be multiplied)
- [ ] Add loading icon while scraper is working 