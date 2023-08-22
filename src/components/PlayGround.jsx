import { useState, useEffect, useRef } from "react"
import ModalComponent from "./ModalComponent"

const PlayGround = ({ option, ...props }) => {
    const [correctNumber, setCorrectNumber] = useState()
    const [guessNumber, setGuessNumber] = useState('')
    const [recentGuesses, setRecentGuesses] = useState([])
    const [triesLeft, setTriesLeft] = useState(option.tries)
    const [showModal, setShowModal] = useState()

    const triesLeftRef = useRef(option.tries)

    useEffect(() => {
        function generateRandomNumber() {
            setCorrectNumber(Math.floor((Math.random() * option.max) + 1))
        }
        generateRandomNumber()
    }, [])
    // console.log(correctNumber)

    const guessNumberInputHandler = (event) => {
        setGuessNumber(event.target.value)
    }

    const guessNumberFormHandler = (event) => {
        event.preventDefault()
        if (triesLeftRef.current > 0) {
            triesLeftRef.current--
            setTriesLeft(triesLeft - 1)
            setRecentGuesses(prevState => ([guessNumber, ...prevState]))
        }
        if (correctNumber == guessNumber) {
            //Modal with play again or main menu
            //guessed correctly
            setShowModal({
                status: true,
                outcome: 'Congratulation, you guessed it!',
                inTries: triesLeftRef.current,
                correctNumber: correctNumber
            })
            return
        }

        if (triesLeftRef.current == 0) {
            //Modal with try again
            //failed to guess within try limit
            setShowModal({
                status: false,
                outcome: 'Sorry, you failed to guess!',
                inTries: 0,
                correctNumber: correctNumber
            })
            return
        }

    }

    const goToMainMenuAfterFailedHandler = () => {
        props.toChangeHighscore(0)
        props.toResetSelectedOption({})
    }

    const goToMainMenuAfterSuccessHandler = () => {
        props.toChangeHighscore(props.highscore + 1)
        props.toResetSelectedOption({})
    }

    const playAgainHandler = () => {
        props.toChangeHighscore(props.highscore + 1)
        setTriesLeft(option.tries)
        triesLeftRef.current = option.tries
        setRecentGuesses([])
        setShowModal(null)
        setGuessNumber('')
        setCorrectNumber(Math.floor((Math.random() * option.max) + 1))
    }

    const tryAgainHandler = () => {
        props.toChangeHighscore(0)
        setTriesLeft(option.tries)
        triesLeftRef.current = option.tries
        setRecentGuesses([])
        setShowModal(null)
        setGuessNumber('')
        setCorrectNumber(Math.floor((Math.random() * option.max) + 1))
    }

    const hideModalHandler = () => {
        setShowModal(null)
    }

    return (
        <>
            {showModal && (
                <ModalComponent
                    modalInfo={showModal}
                    onMainMenuAfterSuccess={goToMainMenuAfterSuccessHandler}
                    onMainMenuAfterFail={goToMainMenuAfterFailedHandler}
                    toPlayAgain={playAgainHandler}
                    toTryAgain={tryAgainHandler}
                    toHideModal={hideModalHandler}
                />
            )}
            <div className="top-info flex justify-between mb-20">
                <span>Username: {props.username}</span>
                <span>Difficulty: {option.difficulty}</span>
                <span>Win streak: {props.highscore}</span>
            </div>
            <form className="flex flex-col mb-20 mt-48" onSubmit={guessNumberFormHandler}>
                <label htmlFor="guess-number" className="text-3xl mb-5">Enter Number</label>
                <input
                    type="number"
                    className="rounded-xl text-xl py-2 px-4 mb-2 mx-20"
                    id="guess-number"
                    min={option.min}
                    max={option.max}
                    value={guessNumber}
                    onChange={guessNumberInputHandler}
                    required
                />
                <p>Enter your guess and press enter!</p>
            </form>
            <div className="flex flex-col gap-5">
                <div>Guesses Left: {triesLeft}</div>
                <div>Your recent guesses: </div>
                <div className="recent-guesses">
                    {recentGuesses.map((recent, index) => <GuessesComponent guessNum={recent} correctNum={correctNumber} key={index} />)}
                </div>
            </div>
        </>
    )
}

const GuessesComponent = ({ guessNum, correctNum }) => {
    if (correctNum > guessNum) {
        return (
            <span className="green-span">{`Higher than ${guessNum}`}</span>
        )
    } else if (correctNum < guessNum) {
        return (
            <span className="red-span">{`Lower than ${guessNum}`}</span>
        )
    } else if (correctNum == guessNum) {
        return (
            <span className="green-span">{`Your're Spont On! ->${guessNum}`}</span>
        )
    }
}

export default PlayGround