import React from "react"
import InputRecipe from "./InputRecipe"
import ScrapedRecipe from "../models/models"

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
        console.log(this.state)         
        if(prevState.recipes !== this.state.recipes) {
            console.log("Recipes have been updated - triggering scraping")
            this.scrapeRecipe(this.state.recipes)
          }    
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
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("got a result, yay")
                        console.log(result)
                    }
                )
            // TODO call backend API for scraping

            let recipe = new ScrapedRecipe(url, 'title', null, 2)
            this.setState({
                scrapedRecipes: [...this.state.scrapedRecipes, recipe]
            })
        });
    }

    render() {
        return (
            <div className="container">
                <div className="inner">
                    <InputRecipe addRecipeToProps={this.addRecipe}></InputRecipe>
                </div>
            </div>
        )
    }
}

export default Homepage