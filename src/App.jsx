import { useState } from 'react'

import EnterUsername from './components/EnterUsername'
import ChooseDifficulty from './components/ChooseDifficulty'

function App() {
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem('guessNumberUsername')) || ''
  )

  const usernameHandler = (inputUsername) => {
    setName(inputUsername)
    localStorage.setItem('guessNumberUsername', JSON.stringify(inputUsername))
  }

  return (
    <div className="App h-full p-2 text-xl">
      {(name == '') && (
        <EnterUsername onEnteredUsername={usernameHandler} />
      )}
      {name && (
        <ChooseDifficulty
          username={name}
        />
      )}
    </div>
  )
}

export default App
