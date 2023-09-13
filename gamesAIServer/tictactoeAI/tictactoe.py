'''
first developed by: David McKenney
modified for use with fastAPI
'''

from .models.boardModel import BoardModel
import random



def get_random_ai_move(board):
    while True:
        r = random.randint(0, 2)
        c = random.randint(0, 2)

        if board[r][c] == "":
            break
    return r, c


def get_winner(board):
    # check rows:
    for row in range(3):
        if board[row][0] == board[row][1] and board[row][1] == board[row][2] and board[row][0] != "":
            return board[row][0]
    # check cols:
    for col in range(3):
        if board[0][col] == board[1][col] and board[1][col] == board[2][col] and board[0][col] != "":
            return board[0][col]
    # check diagonal:
    if board[0][0] == board[1][1] and board[1][1] == board[2][2] and board[0][0] != "":
        return board[0][0]
    if board[0][2] == board[1][1] and board[1][1] == board[2][0] and board[2][0] != "":
        return board[1][1]
    # check if any blanks:
    for row in range(3):
        for col in range(3):
            if board[row][col] == "":
                return ""
    return "tie"


def eval_winner(winner):
    if winner == "tie":
        return 0
    if winner == "o":
        return 1
    else:
        return -1


def get_minimax_move(board):
    move, score = minimax(board, True)
    return move[0], move[1]


'''Pseudocode:

You require a way of determining if the game is over.
Alternatively, you may need to limit the search to a specific depth for complicated games 
(add a function argument that you decrease in recursive calls)
You also need a way to measure the 'value' of the gameboard.
For tic-tac-toe, you can return 1 for AI win, -1 for human win, and 0 for tie. 
The AI tries to maximize the value they can obtain while the human tries to minimize 
the value the AI can obtain.

minimax(board, aiplayer):
	if the game is over:
		return None (no move, since game is over), eval(board)

	if aiplayer (or maximizing player, in general):
		bestmove = None
		bestscore = -Infinity (or any value less than the lowest possible score value. 
			this way, at least one of the possible moves will cause the bestmove to be updated)
	otherwise:
		bestmove = None
		bestscore = Infinity (same logic before except this player is minimizing, 
			so start with a high value)

	for every possible move m:

'''


def minimax(board, ai_player):
    winner = get_winner(board)
    if winner != "":
        return None, eval_winner(winner)

    if ai_player:
        best_move = []
        best_score = -10
    else:
        best_move = []
        best_score = 10

    for r in range(3):
        for c in range(3):
            if board[r][c] == "":
                if ai_player:
                    board[r][c] = "o"
                else:
                    board[r][c] = "x"

                move, score = minimax(board, not ai_player)
                board[r][c] = ""

                if ai_player and score > best_score:
                    best_move = [r, c]
                    best_score = score
                if not ai_player and score < best_score:
                    best_move = [r, c]
                    best_score = score

    return best_move, best_score


def play_game(game: BoardModel) -> tuple[BoardModel, str]:
    winner = get_winner(game.board)
    if winner == "":
        if game.difficulty == "hard":
            rai, cai = get_minimax_move(game.board)
        else:
            rai, cai = get_random_ai_move(game.board)
        game.board[rai][cai] = "o"

    winner = get_winner(game.board)
    return game, winner
