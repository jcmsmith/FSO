import PropTypes from "prop-types"

const LoginForm = ({
  handleLogin,
  handleUsernameInput,
  handlePwInput,
  username,
  pw }) => {
  return (
    <>
      <form onSubmit={handleLogin} >
        <div>
          <p>username</p>
          <input
            data-cy="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={ ({ target }) => handleUsernameInput(target.value)}
          />
        </div>
        <div>
          <p>password</p>
          <input
            data-cy="password-input"
            type="text"
            value={pw}
            name="Password"
            onChange={ ({ target }) => handlePwInput(target.value)}
          />
        </div>
        <button data-cy="login-button" type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameInput: PropTypes.func.isRequired,
  handlePwInput: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  pw: PropTypes.string.isRequired
}

export default LoginForm