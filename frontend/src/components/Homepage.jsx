import React from "react"
import InputRecipe from "./InputRecipe"
import { v4 as uuidv4 } from "uuid";

class Homepage extends React.Component {

    state = {
        recipes: []
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state)         
    }


    addRecipe = url => {
        const newRecipe = {
            id: uuidv4(),  
            url: url,
        };
        this.setState ({
            recipes: [...this.state.recipes, newRecipe]
        })
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