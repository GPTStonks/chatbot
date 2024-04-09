from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from ..dependencies import manager

router = APIRouter()

@router.websocket("/chatws")
async def chat_websocket(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
            await manager.send_random_messages(websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
