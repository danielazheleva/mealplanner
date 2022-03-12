from typing import List, Dict

from pydantic import BaseModel


class Nutrition:
    calories: str
    fat: str
    saturatedFat: str
    carbohydrate: str
    sugar: str
    fiber: str
    protein: str
    sodium: str


class ScrapedRecipe(BaseModel):
    id: str
    url: str
    name: str
    nutrition: Dict
    recipeYield: int
    ingredients: List[str]
