from pydantic import BaseModel

class QueryParams(BaseModel):
    query: str
