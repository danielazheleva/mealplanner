
class Nutrients {
    kcal: string
    protein: string | null 
    fat: string | null
    carb: string | null
}

class ScrapedRecipe {
    url: string
    title: string
    macrosPerServing: Nutrients | null
    servings: number
}

export default ScrapedRecipe