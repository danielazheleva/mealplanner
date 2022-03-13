import React, { useEffect, useRef } from "react";
import InputRecipe from "./InputRecipe"
import ScrapedRecipe from "../models/models"
import ShoppingList from "./ShoppingList"
import RecipeCard from "./RecipeCard";
import Grid from '@mui/material/Grid';

const axios = require('axios').default;

const Homepage = (props) => {
    const [urlsToScrape, setUrl] = React.useState([]);
    const [scrapedRecipes, setScraped] = React.useState([]);
    const [shoppingList, setShoppingList] = React.useState([]);
    const prevAmount = useRef({ urlsToScrape }).current;

    useEffect(() => {
        if(prevAmount.urlsToScrape !== urlsToScrape) {
            console.log("URLs have been updated - triggering scraping")
            scrapeRecipe(urlsToScrape)
          }   
        return () => { 
            prevAmount.scrapedRecipes = scrapedRecipes;
        };
    }, [urlsToScrape]);

    /**
    * Adds all urls to the urlsToScrape state variable.
    */
    function addRecipe(url) {
        Object.entries(url).map(([key,value],i) => {
            setUrl(urlsToScrape => [...urlsToScrape, value])
        })
    }

    /**
    * Funciton to scrape recipes which are in the state
    */
    function scrapeRecipe(urls) {
        console.log(`Urls to scrape are: ${urlsToScrape}`)
        const detail = { urls: urls}
        console.log(`scraping url ${urls}`)
        axios.post(`/api/v1/recipe`, detail)
            .then(res => res.data)
            .then(
                (result) => {
                    result['scraped_recipes'].forEach(r => {
                        const recipe = {
                            url: r.url,
                            title: r.name, 
                            nutrition: r.nutrition, 
                            servings: r.recipeYield,
                            ingredients: r.ingredients
                        }
                        setScraped(scrapedRecipes => [...scrapedRecipes, recipe])
                        setShoppingList(result['shopping_list'])
                    });
                }
            )
    }

        return (
            <div className="container">
                <div className="inner">
                    <InputRecipe addRecipeToProps={addRecipe}></InputRecipe>
                </div>
                <div className="inner">   
                {
                    (scrapedRecipes) ? 
                    (
                        <Grid container style={{padding: "50px"}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            
                                {
                                    scrapedRecipes.map(function(recipe, i){
                                        const cards = []
                                        for(var j=0; j<recipe.servings; j++){
                                            cards.push(
                                                <Grid key={`${i}-${j}`} item xs={2}>
                                                    <RecipeCard scrapedRecipeDetails={recipe} key={`${i}-${j}`}/>
                                                </Grid>
                                                )
                                        }
                                        return cards
                                    })
                                }
                        </Grid>) : null
                }
                </div>
                <div className="inner">
                    {
                        (scrapedRecipes) ? 
                        (
                            <ShoppingList shoppingList={shoppingList}></ShoppingList>
                        ) : null
                    }
                </div>
            </div>
        )
}

export default Homepage