import React from "react"
import InputRecipe from "./InputRecipe"
import ScrapedRecipe from "../models/models"
import RecipeCard from "./RecipeCard";

const axios = require('axios').default;

interface HomepageState {
    recipes: string[];
    scrapedRecipes: ScrapedRecipe[];
}
class Homepage extends React.Component<any, HomepageState> {

    state = {
        recipes: [],
        scrapedRecipes: []
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.recipes !== this.state.recipes) {
            console.log("Recipes have been updated - triggering scraping")
            this.scrapeRecipe(this.state.recipes)
          }   
        console.log(this.state)
    }

    /**
    * Funciton to add new recipe URLs input into the state
    */
    addRecipe = url => {
        this.setState ({
            recipes: [...this.state.recipes, url]
        })
    }

    /**
    * Funciton to scrape recipes which are in the state
    */
    scrapeRecipe = urls => {
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
                            servings: result.recipeYield
                        }
                        this.setState({
                            scrapedRecipes: [...this.state.scrapedRecipes, recipe]
                        })
                    }
                )
        });
    }

    render() {
        return (
            <div className="container">
                <div className="inner">
                    <InputRecipe addRecipeToProps={this.addRecipe}></InputRecipe>
                </div>
                <div className="recipeHolder">
                {
                    this.state.scrapedRecipes.map(function(recipe, i){
                        return <RecipeCard scrapedRecipeDetails={recipe} key={i}/>
                    })
                }
                </div>
            </div>
        )
    }
}

export default Homepage