import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';
import logo from '../img/logo.svg';
import styles from './styles/Login.module.css';

class Login extends React.Component {
  state = {
    isDisable: true,
    passWord: '',
    email: '',
  };

  verifyPasswordAndEmail = () => {
    const { passWord, email } = this.state;
    const number = 6;
    const emailRegex = /^[\w+.]+@\w+\.com$/;
    const pass = passWord.length >= number && emailRegex.test(email);
    this.setState({
      isDisable: !pass,
    });
  };

  handleChangeEmailaAndPassWord = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyPasswordAndEmail());
  };

  handleClick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(addEmail(email));
    return history.push('/carteira');
  };

  render() {
    const { isDisable, passWord, email } = this.state;
    return (
      <div className={ styles.containerPrincipal }>

        <div className={ styles.containerLogin }>
          <img src={ logo } alt="logo" />
          <input
            data-testid="email-input"
            type="email"
            value={ email }
            name="email"
            placeholder="Email"
            onChange={ this.handleChangeEmailaAndPassWord }
          />
          <input
            data-testid="password-input"
            type="password"
            value={ passWord }
            placeholder="Password"
            name="passWord"
            onChange={ this.handleChangeEmailaAndPassWord }
          />
          <button
            type="button"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </div>
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
