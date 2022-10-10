import { useState } from 'react'
import PlayGround from './PlayGround.jsx'

export default function ChooseDifficulty(props) {
    const [selectedOption, setSelectedOption] = useState({})
    const [highscore, setHighscore] = useState(
        JSON.parse(localStorage.getItem('guessNumberHighscore')) || 0
    )
    const options = [
        { difficulty: 'Easy', tries: 5, min: 1, max: 50 },
        { difficulty: 'Medium', tries: 7, min: 1, max: 100 },
        { difficulty: 'Hard', tries: 10, min: 1, max: 500 }
    ]

    const selectOptionHandler = (option) => {
        setSelectedOption(option)
    }

    const resetSelectedOptionHandler = () => {
        setSelectedOption({})
    }

    const changeHighscoreHandler = (highscoreValue) => {
        setHighscore(highscoreValue)
        localStorage.setItem('guessNumberHighscore', JSON.stringify(highscoreValue))
    }

    return (
        <>
            {Object.keys(selectedOption).length === 0 && (
                <>
                    <div className="top-info flex justify-between mb-20">
                        <span>Username: {props.username}</span>
                        <span>Win streak: {highscore}</span>
                    </div>
                    <div className="choose-option-section text-xl flex flex-col items-center gap-y-5">
                        <span>Choose Option</span>
                        {options.map((option, index) =>
                            <button
                                className="rounded-lg"
                                onClick={() => selectOptionHandler(option)}
                                key={index}
                            >
                                {`${option.difficulty}: ${option.min} - ${option.max} (${option.tries} tries)`
                                }</button>
                        )}
                    </div>
                </>
            )}

            {Object.keys(selectedOption).length !== 0 && (
                <PlayGround
                    option={selectedOption}
                    toResetSelectedOption={resetSelectedOptionHandler}
                    toChangeHighscore={changeHighscoreHandler}
                    highscore={highscore}
                    username={props.username}
                />
            )}
        </>
    )
}