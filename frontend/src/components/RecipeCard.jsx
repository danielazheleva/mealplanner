import React from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';


const RecipeCard = (props) => {
    return (
        <Card 
            variant="outlined" 
            // style={{display: 'block',
            //         width: '10vw',
            //         transitionDuration: '0.3s',
            //         height: '10vw'}}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.scrapedRecipeDetails.title}
                </Typography>
                {   
                    Object.keys(props.scrapedRecipeDetails.nutrition).map((key, i) => {
                        return (
                            <Typography key={i} variant="subtitle1">
                                {props.scrapedRecipeDetails.nutrition[key]}
                            </Typography>
                        )
                    })
                }
            </CardContent>
        </Card>
    )
}

export default RecipeCard