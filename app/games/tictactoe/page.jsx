'use client'
import {TicTacToeGame} from "@/components/TicTacToeGame";
import {useState, useRef, useEffect} from "react";
import Modal from "react-modal";
import {useSession} from "next-auth/react";
import {WINS, LOSSES, TIES, INITIAL_XOS} from "@/utils/constants";


const TicTacToePage = () => {

    const {data: session} = useSession();
    const [xos, setXos] = useState(JSON.parse(JSON.stringify(INITIAL_XOS)));
    const [difficult, setDifficult] = useState(true);
    const [winner, setWinner] = useState("")            // can be "", "x", "o", "tie"
    const [results, setResults] = useState({WINS: 0, TIES: 0, LOSSES: 0});
    const [resultModalData, setResultModalData] = useState({SHOW: false, MESSAGE: "", CSS_CLASS: ""});
    const rootRef = useRef(null);

    // Use useEffect to set the appElement when the component mounts
    useEffect(() => {
        Modal.setAppElement(rootRef.current);
    }, []);

    // get user wins/losses from database
    useEffect(() => {
            const fetchResults = async () => {
                try {
                    const response = await fetch(`/api/tictactoe/users/${session?.user.id}`);

                    if (!response.ok) {
                        // handle non-successful HTTP response, e.g., status code is not 200
                        console.error(`HTTP error! Status: ${response.status}`);
                        return;
                    }

                    const data = await response.json();
                    setResults({
                        WINS: data.wins,
                        TIES: data.ties,
                        LOSSES: data.losses
                    })

                } catch (error) {
                    // handle any other errors that may occur, e.g., network issues
                    console.error('An error occurred:', error);
                }
            };

            if (session?.user.id) fetchResults();
        }, [session]
    );


    useEffect(() => {
        if (winner === "x") {
            setResults({...results, WINS: results.WINS + 1})
            const modalData = {SHOW: true, MESSAGE: "YOU WON!", CSS_CLASS: ""};
            setResultModalData(modalData);
        } else if (winner === "o") {
            setResults({...results, LOSSES: results.LOSSES + 1})
            const modalData = {SHOW: true, MESSAGE: "YOU Lost!", CSS_CLASS: ""};
            setResultModalData(modalData);
        } else if (winner === "tie") {
            setResults({...results, TIES: results.TIES + 1})
            const modalData = {SHOW: true, MESSAGE: "That's a Tie!", CSS_CLASS: ""};
            setResultModalData(modalData);
        }
    }, [winner]);

    useEffect(() => {

        const updateResultsInDatabase = async () => {
            try {
                const response = await fetch(`/api/tictactoe/users/${session?.user.id}`,
                    {
                        method: 'PATCH',
                        body: JSON.stringify({
                            wins: results.WINS,
                            losses: results.LOSSES,
                            ties: results.TIES,
                            user_id: session.user.id,
                        })
                    })
            } catch (e) {
                console.log(e);
            }
        }

        if (session?.user.id) updateResultsInDatabase();
    }, [results])


    const connectToAI = async () => {

        try {
            const response = await fetch("../api/tictactoe",
                {
                    method: 'POST',
                    body: JSON.stringify({
                        xos: xos,
                        difficult: difficult
                    })
                })

            if (response.ok) {
                const responseData = await response.json();
                // Handle response data from the backend
                setXos(responseData.xos);
                setWinner(responseData.winner);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleXOClick = (rowIndex, colIndex) => {
        if (winner === "" && xos[rowIndex][colIndex] === "") {
            const updatedXos = [...xos];
            updatedXos[rowIndex][colIndex] = 'x';
            setXos(updatedXos);
            connectToAI();
        }
    }

    const handleRestart = () => {
        setXos(JSON.parse(JSON.stringify(INITIAL_XOS)));
        setWinner("")
    }

    const handleDifficultyChange = () => {
        setDifficult(!difficult)
    };

    const handleResultModal = () => {
        const modalData = {SHOW: false, MESSAGE: "", CSS_CLASS: ""};
        setResultModalData(modalData);
    }


    return (
        <div id="root" ref={rootRef}>
            <TicTacToeGame
                xos={xos}
                results={results}
                winner={winner}
                difficult={difficult}
                handleRestart={handleRestart}
                handleXOClick={handleXOClick}
                handleDifficultyChange={handleDifficultyChange}
            />
            <Modal isOpen={resultModalData.SHOW}
                   className={`modal ${winner}`}
                   appElement={rootRef.current}>
                <button onClick={handleResultModal}>{resultModalData.MESSAGE}</button>
            </Modal>
        </div>
    );

}


export default TicTacToePage;
