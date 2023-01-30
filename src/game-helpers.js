import { NUM_LENGTH_OF_GUESS } from './constants'

export function checkGuess(guess, answer) {
  if (!guess) {
    return null
  }

  const guessChars = guess.toUpperCase().split('')
  const answerChars = answer.split('')

  return guessChars.map((guessChar, index) => {
    const answerChar = answerChars[index]

    let status
    if (guessChar === answerChar) {
      status = 'correct'
    } else if (answerChars.includes(guessChar)) {
      status = 'misplaced'
    } else {
      status = 'incorrect'
    }
    return {
      letter: guessChar,
      status,
    }
  })
}

/**
 * @param {String} guess
 * @returns {Array<{type: String, message: String}>}
 */
export function validate(guess) {
  return [validateLength, validateChars].reduce(
    (errors, validator) => validator(errors, guess),
    []
  )
}

const validateLength = (errors = [], guess) => {
  if (guess.length < NUM_LENGTH_OF_GUESS) {
    errors.push({
      type: 'too-short',
      message: `guess must be ${NUM_LENGTH_OF_GUESS} letters exactly`,
    })
  }
  return errors
}

const validateChars = (errors = [], guess) => {
  if (!guess.match(/^[a-zA-Z]+$/)) {
    errors.push({
      type: 'bad-content',
      message: 'guess must consist of only english alphabet letters',
    })
  }
  return errors
}
