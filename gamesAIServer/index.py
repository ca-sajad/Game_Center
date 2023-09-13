
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tictactoeAI import tictactoe
from tictactoeAI.models.boardModel import BoardModel

# uvicorn index:app --port 8000
app = FastAPI()

# Configure CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/tictactoe")
def hello_world(game: BoardModel):
    try:
        game.validate_board()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    game, winner = tictactoe.play_game(game)

    response = {
        "game": game,
        "winner": winner,
    }

    return response


if __name__ == "__main__":
    uvicorn.run(app)
