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
        urls.forEach(url => {
            const detail = { url: url}
            console.log(`scraping url ${url}`)
            axios.post(`/api/v1/recipe`, detail)
                .then(res => res.data)
                .then(
                    (result) => {
                        const recipe = {
                            url: url,
                            title: result.name, 
                            nutrition: result.nutrition, 
                            servings: result.recipeYield,
                            ingredients: result.ingredients
                        }
                        setScraped(scrapedRecipes => [...scrapedRecipes, recipe])
                    }
                )
        });
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
                                                <Grid item xs={2}>
                                                    <RecipeCard scrapedRecipeDetails={recipe} key={j}/>
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
                            <ShoppingList recipes={scrapedRecipes}></ShoppingList>
                        ) : null
                    }
                </div>
            </div>
        )
}

export default Homepage