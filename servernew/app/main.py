from fastapi import FastAPI, APIRouter

from app.api.api import api_router
from app.core.config import settings


root_router = APIRouter()
app = FastAPI(title="Recipe API")

app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(root_router)

# 5
if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
