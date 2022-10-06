import { useState } from 'react'

import EnterUsername from './components/EnterUsername'
import ChooseDifficulty from './components/ChooseDifficulty'

function App() {
  const [name, setName] = useState('')

  const usernameHandler = (inputUsername) => {
    setName(inputUsername)
  }

  return (
    <div className="App border-8 border-[#cce3de] menu-play-container p-2 text-xl">
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
