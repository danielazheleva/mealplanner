from typing import List

from pydantic import BaseModel

from app.models import ScrapedRecipe


class ScrapingRequest(BaseModel):
    urls: List[str]


class ScrapedResult(BaseModel):
    scraped_recipes: List[ScrapedRecipe]
    shopping_list: List[str]

    class Config:
        schema_extra = {
            "example": {
                "scraped_recipes": [
                    {
                        "id": "d27e118c-912b-46c8-b2b4-9727b22f7dbb",
                        "url": "https://www.bbcgoodfood.com/recipes/next-level-three-cheese-risotto",
                        "name": "Next level three-cheese risotto",
                        "nutrition": {
                            "calories": 595,
                            "fat": 24,
                            "saturates": 15
                        },
                        "recipeYield": 4,
                    },
                    {
                        "id": "c55c40a6-2d18-4efc-9fd3-2a631a9f032e",
                        "url": "https://www.bbcgoodfood.com/recipes/lemon-cheesecake",
                        "name": "Lemon cheesecake",
                        "nutrition": {
                            "calories": 470,
                            "fat": 37,
                            "saturates": 23
                        },
                        "recipeYield": 6,
                    },
                ],
                "shopping_list": {

                }
            }
        }
