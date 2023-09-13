'use client'
import {HangmanGame} from "@/components/HangmanGame";
import {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {MISPLACED, CORRECT, SHOW, MESSAGE, CSS_CLASS} from "@/utils/constants";
import Modal from "react-modal";
import YesNoModal from "@/components/YesNoModal";


const HangmanPage = () => {

    const {data: session} = useSession();
    const [correctGuesses, setCorrectGuesses] = useState(['']);       // could be '', correct char, misplaced char
    const [incorrectGuesses, setIncorrectGuesses] = useState(['']);   // incorrect chars
    const [colorClass, setColorClass] = useState(['']);               // could be '', CORRECT, MISPLACED
    const [help, setHelp] = useState(0);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [resultModalData, setResultModalData] = useState({SHOW: false, MESSAGE: "", CSS_CLASS: ""});
    const [showResultModal, setShowResultModal] = useState(false);
    const [showNextWordModal, setShowNextWordModal] = useState(false);
    const word = useRef([]);
    const rootRef = useRef(null);

    // Use useEffect to set the appElement when the component mounts
    useEffect(() => {
        Modal.setAppElement(rootRef.current);
    }, []);

    useEffect(() => {
        getNewWord();
    }, [])

    const getNewWord = async () => {

        while (word.current.length < 5 || word.current.length > 10) {
            const response = await fetch('../api/hangman');
            const data = await response.json();

            console.log(data.word);
            word.current = Array.from(data.word.toLowerCase());
        }

        const initialArray = Array.from({length: word.current.length}, () => '');
        setCorrectGuesses([...initialArray]);
        setIncorrectGuesses([...initialArray]);
        setColorClass([...initialArray]);
        setHelp(1);
        if (word.current.length > 7)
            setHelp(2);
        setGameOver(false);

    }

    // get user wins/losses from database
    useEffect(() => {
            const fetchResults = async () => {
                try {
                    const response = await fetch(`/api/hangman/users/${session?.user.id}`);

                    if (!response.ok) {
                        // handle non-successful HTTP response, e.g., status code is not 200
                        console.error(`HTTP error! Status: ${response.status}`);
                        return;
                    }

                    const data = await response.json();
                    setLosses(data.losses);
                    setWins(data.wins);

                } catch (error) {
                    // handle any other errors that may occur, e.g., network issues
                    console.error('An error occurred:', error);
                }
            };

            if (session?.user.id) fetchResults();
        }, [session]
    );

    useEffect(() => {
        const updateResultsInDatabase = async () => {
            try {
                const response = await fetch(`/api/hangman/users/${session?.user.id}`,
                    {
                        method: 'PATCH',
                        body: JSON.stringify({
                            wins: wins,
                            losses: losses,
                            user_id: session.user.id,
                        })
                    })
            } catch (e) {
                console.log(e);
            }
        }

        if (session?.user.id) updateResultsInDatabase();
    }, [wins, losses])


    const handleResultModal = () => {
        const modalData = {SHOW: false, MESSAGE: "", CSS_CLASS: ""};
        setResultModalData(modalData);
    }


    // if mystery word is complete, increase wins & show modal
    useEffect(() => {
        if (!correctGuesses.includes('') && !gameOver) {
            setWins(wins => wins + 1);
            const modalData = {SHOW: true, MESSAGE: "You Won!", CSS_CLASS: "win"};
            setResultModalData(modalData);
            setGameOver(true);
        }
    }, [correctGuesses]);


    // if all incorrect guesses are filled, increase losses & show modal
    useEffect(() => {
        if (!incorrectGuesses.includes('') && !gameOver) {
            setLosses(losses => losses + 1);
            setGameOver(true);
            setCorrectGuesses(word.current);
            const modalData = {SHOW: true, MESSAGE: "Better Luck Next Word!", CSS_CLASS: "loss"};
            setResultModalData(modalData);
        }
    }, [incorrectGuesses]);

    const addGuess = (char, idxArray) => {
        const newGuess = [...correctGuesses];
        idxArray.map(idx => newGuess[idx] = char);
        setCorrectGuesses(newGuess);
    }

    const addCorrectness = (correctness, idxArray) => {
        const newCorrects = [...colorClass]
        idxArray.map(idx => newCorrects[idx] = correctness);
        setColorClass(newCorrects);
    }

    const addIncorrectGuess = (char) => {
        const newIncorrectGuess = [...incorrectGuesses];
        newIncorrectGuess[newIncorrectGuess.indexOf("")] = char
        setIncorrectGuesses(newIncorrectGuess);
    }


    const handleGuess = (char, charIndex) => {
        if ((gameOver || correctGuesses.includes(char) || incorrectGuesses.includes(char)) && char !== '')
            return;

        const alphabetRegex = /^[a-zA-Z]?$/;
        if (!alphabetRegex.test(char)) {
            return;
        }
        char = char.toLowerCase();

        // a misplaced item has been removed
        if (char === "") {
            addCorrectness("", [charIndex]);
            addGuess(char, [charIndex]);
        }
        // incorrect guess
        else if (!word.current.includes(char)) {
            addGuess("", [charIndex]);
            addIncorrectGuess(char);
        }
        // correct guess
        else if (word.current[charIndex] === char) {
            // reveal all indexes containing char
            const idxArray = []
            let idx = word.current.indexOf(char);
            while (idx !== -1) {
                idxArray.push(idx)
                idx = word.current.indexOf(char, idx + 1);
            }
            addCorrectness(CORRECT, idxArray);
            addGuess(char, idxArray);
        }
        // misplaced guess
        else {
            addCorrectness(MISPLACED, [charIndex]);
            addGuess(char, [charIndex]);
        }
    }

    const handleHelp = () => {
        if (help === 0 || gameOver)
            return;

        let idx = Math.floor(Math.random() * word.current.length);
        while (correctGuesses[idx] !== "") {
            idx = Math.floor(Math.random() * word.current.length);
        }

        addCorrectness(CORRECT, [idx]);
        addGuess(word.current[idx], [idx]);
        setHelp(help => help - 1);
    }

    const handleNextWord = () => {
        if (!gameOver) {
            setShowNextWordModal(true);
        } else {
            word.current = [];
            getNewWord();
        }
    }

    const closeNextWordModal = () => {
        setShowNextWordModal(false);
    };

    const handleYesNextWordModal = () => {
        setLosses(losses => losses + 1);
        word.current = [];
        getNewWord();
        closeNextWordModal();
    };

    const handleNoNextWordModal = () => {
        closeNextWordModal();
    };

    const handleShow = () => {
        if (!gameOver)
            setShowResultModal(true);
    }

    const closeResultModal = () => {
        setShowResultModal(false);
    };

    const handleYesResultModal = () => {
        if (!gameOver)
            setLosses(losses => losses + 1);
        setGameOver(true);
        // change the color of misplaced letters if needed
        editColorClass();
        // set the correct answer
        setCorrectGuesses(word.current);

        closeResultModal();
    };

    const handleNoResultModal = () => {
        closeResultModal();
    };

    // change positions of yellow squares if needed
    const editColorClass = () => {
        const cClass = new Array(colorClass.length).fill('');
        for (let i = 0; i < colorClass.length; i++) {
            if (colorClass[i] === CORRECT)
                cClass[i] = CORRECT;
            else if (colorClass[i] === MISPLACED) {
                let idx = word.current.indexOf(correctGuesses[i]);
                while (idx !== -1) {
                    cClass[idx] = MISPLACED;
                    idx = word.current.indexOf(correctGuesses[i], idx + 1);
                }
            }
        }

        setColorClass(cClass);
    }

    return (
        <div id="root" ref={rootRef}>
            <HangmanGame
                guesses={correctGuesses}
                incorrectGuesses={incorrectGuesses}
                colorClass={colorClass}
                help={help}
                wins={wins}
                losses={losses}
                gameOver={gameOver}
                handleGuess={handleGuess}
                handleNextWord={handleNextWord}
                handleHelp={handleHelp}
                handleShow={handleShow}
            />
            <Modal                          // is shown when the game is lost or won
                isOpen={resultModalData.SHOW}
                className={`modal ${resultModalData.CSS_CLASS}`}
                appElement={rootRef.current}>
                <button onClick={handleResultModal}>{resultModalData.MESSAGE}</button>
            </Modal>
            <YesNoModal                     // is shown when "show the word" button is pressed
                isOpen={showResultModal}
                onRequestClose={closeResultModal}
                onYesClick={handleYesResultModal}
                onNoClick={handleNoResultModal}
            />
            <YesNoModal                     // is shown when "next word" button is pressed
                isOpen={showNextWordModal}
                onRequestClose={closeNextWordModal}
                onYesClick={handleYesNextWordModal}
                onNoClick={handleNoNextWordModal}
            />
        </div>
    );

}


export default HangmanPage;

