export const GAMES = [
    {
        id: 1,
        name: "tictactoe",
        title: "Tic Tac Toe",
        desc: "A 3x3 tic-tac-toe played against a mighty AI",
        image: "/images/games/tictactoe.svg"
    },
    {
        id: 2,
        name: "hangman",
        title: "Han_man",
        desc: "Can you guess the word?",
        image: "/images/games/hangman.png"
    },
]

export const TICTACTOE = GAMES[0].name;
export const HANGMAN = GAMES[1].name;

export const CSS_CLASS = "cssClass";
export const CORRECT = "correct";
export const INCORRECT = "incorrect";
export const MESSAGE = "message";
export const MISPLACED = "misplaced";
export const SHOW = "show";

export const WINS = "Wins";
export const TIES = "Ties";
export const LOSSES = "Losses";

export const INITIAL_XOS = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];