import uuid


class FatDetails:
    sugar: int


class MacroNutrients:
    cals: int
    proteins: int
    carbs: int
    fats: FatDetails


class ScrapedRecipe:
    id: uuid
    url: str
    serves: int
    macronutrients: MacroNutrients

