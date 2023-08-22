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
            <form className="flex flex-col justify-center items-center" onSubmit={formSubmitHandler}>
                <label htmlFor="username" className="text-3xl mt-20 mb-5">Username</label>
                <input
                    type="text"
                    className="rounded-xl text-xl py-2 px-4 mb-2 w-full max-w-lg"
                    id="username"
                    value={inputUsername}
                    onChange={usernameHandler}
                />
                <p className="text-base">Enter username and press enter!</p>
            </form>
        </div>
    )
}

export default EnterUsername