import time
from fastapi import WebSocket
from .utils.phrases import get_random_phrase, generate_related_questions, generate_reference
import asyncio
import json

class ConnectionManager:
    active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: dict, websocket: WebSocket):
        message_json = json.dumps(message)
        await websocket.send_text(message_json)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    async def send_random_messages(self, websocket: WebSocket):
        result_data = get_random_phrase()
        related_questions = generate_related_questions()
        reference = generate_reference()

        message_1 = {
            "type": "model_step",
            "result_data": result_data,
            "body": get_random_phrase(),
            "reference": reference,
            "related": related_questions,
        }
        await self.send_personal_message(message_1, websocket)

        message_2 = {
            "type": "data",
            "result_data": get_random_phrase(),
            "body": get_random_phrase(),
            "reference": reference,
            "related": related_questions,
        }
        time.sleep(2)

        await self.send_personal_message(message_2, websocket)

manager = ConnectionManager()
