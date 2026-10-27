import { useState } from 'react'
import { isValidEmail } from '../utils/helpers'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email.'
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage(
        'Demo login only. No real account or authentication exists.'
      )
      setPassword('')
    } else {
      setSuccessMessage('')
    }
  }

  return (
    <div className="container page-section">
      <div className="auth-card">
        <h1 className="h3">
          Login <small className="demo-label">Demo only</small>
        </h1>

        <p className="text-muted">
          Sign in to your Electronics Shop account.
        </p>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              className={
                errors.email ? 'form-control is-invalid' : 'form-control'
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

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="mt-3 mb-0 small">
          New here? <a href="#/register">Create an account</a>
        </p>
      </div>
    </div>
  )
}

export default Login