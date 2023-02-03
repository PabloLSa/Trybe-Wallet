import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    isDisable: true,
    passWord: '',

  };

  verifyPasswordAndEmail = () => {
    const { email } = this.props;
    const { passWord } = this.state;
    const number = 6;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pass = passWord.length >= number && emailRegex.test(email);
    this.setState({
      isDisable: !pass,
    });
  };

  handleChangePassword = ({ target }) => {
    const { value } = target;
    this.setState({
      passWord: value,
    }, this.verifyPasswordAndEmail);
  };

  handleChangeEmail = ({ target }) => {
    const { value } = target;
    const { dispatch } = this.props;
    dispatch(addEmail(value));
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { isDisable, passWord } = this.state;
    const { email } = this.props;
    return (
      <div>
        Login
        <input
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ this.handleChangeEmail }
        />
        <input
          data-testid="password-input"
          type="password"
          value={ passWord }
          onChange={ this.handleChangePassword }
        />
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </div>

    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;
const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});
export default connect(mapStateToProps)(Login);
