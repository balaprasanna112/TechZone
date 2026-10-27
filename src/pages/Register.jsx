import { useState } from 'react'
import { isValidEmail } from '../utils/helpers'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (name.trim() === '') {
      newErrors.name = 'Please enter your name.'
    }

    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email.'
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage(
        'Demo registration only. No account was created and nothing was saved.'
      )

      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } else {
      setSuccessMessage('')
    }
  }

  return (
    <div className="container page-section">
      <div className="auth-card">
        <h1 className="h3">
          Create Account
          <small className="demo-label">Demo only</small>
        </h1>

        <p className="text-muted">
          Join Electronics Shop for member deals.
        </p>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              className={
                errors.name
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <div className="invalid-feedback">
              {errors.name}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              className={
                errors.email
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <div className="invalid-feedback">
              {errors.email}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className={
                errors.password
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <div className="invalid-feedback">
              {errors.password}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>

            <input
              type="password"
              className={
                errors.confirmPassword
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />

            <div className="invalid-feedback">
              {errors.confirmPassword}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>
        </form>

        <p className="mt-3 mb-0 small">
          Already have an account? <a href="#/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register