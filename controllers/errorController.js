// handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue)
  const code = 409
  const error = `An account with that ${field} already exists.`
  res.status(code).send({ messages: error, fields: field })
}
// handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
  const errors = Object.values(err.errors).map(el => el.message)
  const fields = Object.values(err.errors).map(el => el.path)
  const code = 400
  if (errors.length > 1) {
    const formattedErrors = errors.join(' ')
    res.status(code).send({ messages: formattedErrors, fields: fields })
  } else {
    res.status(code).send({ messages: errors, fields: fields })
  }
}
// error controller function
module.exports = (err, req, res, next) => {
  try {
    if (err.name === 'ValidationError') return err = handleValidationError(err, res)
    if (err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res)
  } catch (err) {
    res
      .status(500)
      .send('An unknown error occurred.')
  }
}
