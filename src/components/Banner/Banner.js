import React from 'react'

function Banner({ win, answer, guessCount }) {
  return win ? (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>
          {guessCount} guess{guessCount > 1 ? 'es' : ''}
        </strong>
        !
      </p>
    </div>
  ) : (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  )
}

export default Banner
