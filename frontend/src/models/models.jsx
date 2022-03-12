
class Nutrients {
    kcal: string
    protein: string | null 
    fat: string | null
    carb: string | null
}

class ScrapedRecipe {
    url: string
    title: string
    nutrition: Nutrients | null
    servings: number
    ingredients: []
}

export default ScrapedRecipe