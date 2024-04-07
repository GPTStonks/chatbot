from fastapi import APIRouter
from ..models.query import QueryParams as QueryParams
from ..utils.phrases import get_random_phrase, generate_related_questions, generate_reference

router = APIRouter()

@router.post("/ask")
async def ask(query_params: QueryParams):
    response_type = "result_data"
    result_data = get_random_phrase()
    related_questions = generate_related_questions()
    reference = generate_reference()

    return {
        "type": response_type,
        "result_data": result_data,
        "body": get_random_phrase(),
        "reference": reference,
        "related_questions": related_questions,
    }
