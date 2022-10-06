import { useState } from "react"

const EnterUsername = (props) => {
    const [inputUsername, setInputUsername] = useState('')

    const usernameHandler = (event) => {
        setInputUsername(event.target.value)
    }

    const formSubmitHandler = (event) => {
        event.preventDefault()
        props.onEnteredUsername(inputUsername)
    }


    return (
        <div className="flex flex-col justify-center h-full">
            <form className="flex flex-col" onSubmit={formSubmitHandler}>
                <label htmlFor="username" className="text-3xl mb-5">Username</label>
                <input
                    type="text"
                    className="rounded-xl text-xl py-2 px-4 mb-2 mx-20"
                    id="username"
                    value={inputUsername}
                    onChange={usernameHandler}
                />
                <p>Enter username and press enter!</p>
            </form>
        </div>
    )
}

export default EnterUsername