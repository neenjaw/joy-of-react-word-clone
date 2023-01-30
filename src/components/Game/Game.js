import React from 'react'

import { sample } from '../../utils'
import { WORDS } from '../../data'
import GameInput from '../GameInput'
import GuessResults from '../GuessResults'
import Banner from '../Banner'
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'
import { validate } from '../../game-helpers'

// Pick a random word on every pageload.
const answer = sample(WORDS)
// To make debugging easier, we'll log the solution in the console.
console.info({ answer })

function Game() {
  const [guesses, setGuesses] = React.useState([])

  const win = guesses[guesses.length - 1] === answer
  const complete = guesses.length >= NUM_OF_GUESSES_ALLOWED
  const gameOver = complete || win
  const guessCount = guesses.length

  const handleCheckGuess = React.useCallback(
    (guess) => {
      console.log(guess)

      if (gameOver) {
        return Promise.reject({
          type: 'game-over',
          message: "Can't guess, the game is over.",
        })
      }

      if (guesses.includes(guess)) {
        return Promise.reject({
          type: 'duplicate-guess',
          message: 'You have already guessed that',
        })
      }

      const validation = validate(guess)
      if (validation.errors.length) {
        return Promise.reject({
          type: 'validation-error',
          message: 'You have validation errors',
          errors: validation.errors,
        })
      }

      const nextGuesses = [...guesses]
      nextGuesses.push(guess)
      setGuesses(nextGuesses)

      return Promise.resolve()
    },
    [gameOver, guesses]
  )

  return (
    <main>
      <GuessResults guesses={guesses} answer={answer} />
      <GameInput handleCheckGuess={handleCheckGuess} disabled={gameOver} />
      {gameOver && <Banner win={win} guessCount={guessCount} answer={answer} />}
    </main>
  )
}

export default Game
