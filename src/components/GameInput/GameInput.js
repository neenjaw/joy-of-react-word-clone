import React from 'react'

function GameInput({ handleCheckGuess, disabled }) {
  const [guess, setGuess] = React.useState('')

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
      handleCheckGuess(guess).then(() => setGuess(''))
    },
    [guess, handleCheckGuess]
  )

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        autoComplete="off"
        disabled={disabled}
        maxLength="5"
        minLength="5"
        pattern="[a-zA-Z]{5}"
        required
      />
    </form>
  )
}

export default GameInput
