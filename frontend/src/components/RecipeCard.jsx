import React from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const RecipeCard = (props) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.scrapedRecipeDetails.title}
                </Typography>
                {   
                    Object.keys(props.scrapedRecipeDetails.nutrition).map((key, i) => {
                        return (
                            <Typography color="text.secondary">
                                {key}: {props.scrapedRecipeDetails.nutrition[key]}
                            </Typography>
                        )
                    })
                }
            </CardContent>
        </Card>
    )
}

export default RecipeCard