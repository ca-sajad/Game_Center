from pydantic import BaseModel


class BoardModel(BaseModel):
    board: list[list[str]]
    difficulty: str

    def validate_board(self):
        if len(self.board) != 3:
            raise ValueError("Board must have 3 rows")
        for row in self.board:
            if len(row) != 3:
                raise ValueError("Each row in the board must have 3 columns")
            if not all(element in ['', 'x', 'o'] for element in row):
                raise ValueError("Board elements must be one of '', 'x', 'o'")

        if self.difficulty not in ["hard", "easy"]:
            raise ValueError("Board difficulty must be hard or easy")
