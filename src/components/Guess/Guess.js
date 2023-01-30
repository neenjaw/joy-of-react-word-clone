import React from 'react'
import { checkGuess } from '../../game-helpers'
import { range } from '../../utils'

function Cell({ letter, status }) {
  return <span className={status ? `cell ${status}` : 'cell'}>{letter}</span>
}

function Guess({ guess, answer }) {
  const comparison = checkGuess(guess, answer)

  return (
    <p className="guess">
      {range(5).map((i) => (
        <React.Fragment key={`${guess}-${i}`}>
          {comparison ? (
            <Cell letter={comparison[i].letter} status={comparison[i].status} />
          ) : (
            <Cell />
          )}
        </React.Fragment>
      ))}
    </p>
  )
}

export default Guess
