'use client'
import Result from "@/components/Result";


// To use x/o instead of coloring, change Square component value to {val} and remove ${val} from className
export const TicTacToeGame = ({
                                  xos, results, difficult,
                                  handleRestart, handleXOClick, handleDifficultyChange
                              }) => {


    const Square = ({val, handleClick}) => {

        return (
            <div className={`ttt-square " ${val}`} onClick={handleClick}>
            </div>
        )
    }

    const ToggleButton = ({difficult, handleClick}) => {
        return (
            <div className={`toggle-button ${difficult ? 'hard' : 'easy'}`}
                 onClick={handleClick}>
                {difficult ? "Hard" : "Easy"}
                <span className="slider"></span>
            </div>
        )
    }

    return (
        <div className="flex justify-center mt-40 lg:mt-20" id="grid">
            <section className="grid grid-cols-3 gap-x-4 gap-y-4">
                {xos.map((row, rowIndex) => (
                    row.map((col, colIndex) => (
                        <Square
                            key={`${rowIndex}-${colIndex}`}
                            val={col}
                            handleClick={() => handleXOClick(rowIndex, colIndex)}
                        />
                    ))
                ))}
            </section>
            <section className="ttt-results">
                {Object.entries(results).map(([result, value]) => (
                        <Result
                            key={result}
                            title={result}
                            value={value}
                        />
                ))}
                <div className="flex-center flex-auto gap-6">
                    <div className="flex-center toggle-title">Difficulty</div>
                    <ToggleButton
                        difficult={difficult}
                        handleClick={handleDifficultyChange}
                    />
                </div>
                <button type="button" onClick={handleRestart} className="btn">
                    Restart
                </button>
            </section>

        </div>
    )
}