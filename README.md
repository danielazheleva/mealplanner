# Meal Planner

A website which allows users to input a recipes and outputs a shopping list of combined ingredients. 

### Getting started

1. Run the backend through the `main.py` file
2. Run the frontend `npm start`

# Old verison

![](./docs/v1-gif.gif)
## Workflow

1. user puts multiple recipe url in form + number of servings they want from each
2. Scraper pulls all data for each recipe
    - servings it makes 
    - macros
    - ingredients list 
3. Calculate shopping list to satisfy all recipes and servings.
4. Drag and drop recipes into week table and output macros 
