import Result from "@/components/Result";
import {CORRECT, INCORRECT} from "@/utils/constants";
import Image from "next/image";
import Modal from "react-modal";
import React, {useState} from "react";


export const HangmanGame = ({guesses, incorrectGuesses, colorClass, help, wins, losses, gameOver,
                                handleGuess, handleNextWord, handleHelp, handleShow}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

      const handleClick = () => {
        setIsModalOpen(true);
      };

      const handleMouseLeave = () => {
        setIsModalOpen(false);
      };



    const CharSpace = ({val, id, colorClass, handleChange}) => {
        return(
            <input className={`charSpace ${colorClass}`}
                name={`${colorClass}-${id}`}
                type="text"
                value={val}
                disabled={colorClass === INCORRECT || colorClass === CORRECT}
                onChange={handleChange}
            />
        )
    }

    return (
        <div className="flex-1 flex-col justify-center mt-16 gap-y-2">
            <p className="header">Mystery Word</p>
            <section className="flex justify-center mt-2 mb-10">
                {guesses.map((char, charIndex) => (
                    <CharSpace
                        key={charIndex}
                        id={charIndex}
                        val={char.toUpperCase()}
                        colorClass={colorClass[charIndex]}
                        handleChange={(e) => handleGuess(e.target.value, charIndex)}
                    />
                ))}
            </section>
            <p className="header">Incorrect Letters</p>
            <section className="flex justify-center mt-2">
                {incorrectGuesses.map((char, charIndex) => (
                    <CharSpace
                        key={charIndex}
                        val={char.toUpperCase()}
                        id={charIndex}
                        colorClass={INCORRECT}
                    />
                ))}
            </section>
            <section className="flex flex-auto gap-10 mt-12 justify-center">
                <button
                    type="button"
                    onClick={handleNextWord}
                    className="btn"
                >
                    Next Word
                </button>
                <button
                    type="button"
                    onClick={handleHelp}
                    className={gameOver || help === 0 ? 'btn game-over' : 'btn'}
                >
                    {help > 0 ? "Help Me!" : "No Help Remained"}
                </button>
                <button
                    type="button"
                    onClick={handleShow}
                    className="btn"
                >
                    Show the Word
                </button>
            </section>
            <div className="flex flex-col mt-10 items-center gap-y-4" >
                <Result
                    title="Wins"
                    value={wins}
                />
                <Result
                    title="Losses"
                    value={losses}
                />
            </div>
            <div className="flex justify-center mt-6 items-center">
                <Image
                    src="/icons/question-mark-100.png"
                    alt="question mark"
                    width={40} height={40}
                    onClick={handleClick}
                />
                <Modal
                    className="modal note-modal"
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                  >
                    <ul className="note-list">
                        <li className="mb-2">Correct guesses are shown in green squares</li>
                        <li className="mb-2">Incorrect guesses are added to lower (red) squares</li>
                        <li className="mb-2">Guesses that are in wrong positions are shown in yellow squares</li>
                        <li className="mb-2">You will lose the game if you select &quot;next word&quot;
                            or &quot;show the word&quot; without success in your current try</li>
                        <li className="mb-2">You can use 1 or 2 helps (depending on the length of the word)</li>
                    </ul>
                    <button
                        className="text-xl border-2 p-2 rounded-2xl "
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </button>
                </Modal>
            </div>

        </div>
    )
}