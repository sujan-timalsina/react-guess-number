import { useState, useEffect, useRef } from "react";
import ModalComponent from "./ModalComponent";

const PlayGround = ({ option, ...props }) => {
    const [correctNumber, setCorrectNumber] = useState();
    const [guessNumber, setGuessNumber] = useState('');
    const [recentGuesses, setRecentGuesses] = useState([]);
    const [triesLeft, setTriesLeft] = useState(option.tries);
    const [showModal, setShowModal] = useState();

    useEffect(() => {
        function generateRandomNumber() {
            setCorrectNumber(Math.floor((Math.random() * option.max) + 1));
        }
        generateRandomNumber();
    }, [])

    const guessNumberInputHandler = (event) => {
        setGuessNumber(event.target.valueAsNumber);
    }

    const guessNumberFormHandler = (event) => {
        event.preventDefault();

        setTriesLeft(prevTriesLeft => prevTriesLeft - 1);
        setRecentGuesses(prevState => ([guessNumber, ...prevState]));
    };

    useEffect(() => {
        if (triesLeft === 0) {
            if (correctNumber === guessNumber) {
                setShowModal({
                    status: true,
                    outcome: 'Congratulations, you guessed it!',
                    inTries: triesLeft,
                    correctNumber: correctNumber
                });
                props.toChangeHighscore(props.highscore + 1);
            } else {
                setShowModal({
                    status: false,
                    outcome: 'Sorry, you failed to guess!',
                    inTries: triesLeft,
                    correctNumber: correctNumber
                });
                props.toChangeHighscore(0);
            }
        } else {
            if (correctNumber === guessNumber) {
                setShowModal({
                    status: true,
                    outcome: 'Congratulations, you guessed it!',
                    inTries: triesLeft,
                    correctNumber: correctNumber
                });
                props.toChangeHighscore(props.highscore + 1);
            }
        }
        setGuessNumber('');
    }, [triesLeft]);

    const goToMainMenuAfterFailedHandler = () => {
        props.toResetSelectedOption({});
    }

    const goToMainMenuAfterSuccessHandler = () => {
        props.toResetSelectedOption({});
    }

    const playAgainHandler = () => {
        setTriesLeft(option.tries);
        setRecentGuesses([]);
        setShowModal(null);
        setGuessNumber('');
        setCorrectNumber(Math.floor((Math.random() * option.max) + 1));
    }

    const tryAgainHandler = () => {
        props.toChangeHighscore(0);
        setTriesLeft(option.tries);
        setRecentGuesses([]);
        setShowModal(null);
        setGuessNumber('');
        setCorrectNumber(Math.floor((Math.random() * option.max) + 1));
    }

    const hideModalHandler = () => {
        setShowModal(null);
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

export default PlayGround;