import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../img/logo.svg';
import vector from '../img/vector.png';
import Vector from '../img/Vector.png';
import styles from './styles/Header.module.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const sum = expenses.reduce((acc, curr) => {
      const currencies = Object.entries(curr.exchangeRates)
        .find((currency) => currency[0] === curr.currency);
      const { ask } = currencies[1];
      return acc + Number(curr.value) * Number(ask);
    }, 0);
    return (
      <div className={ styles.containerHeader }>
        <img className={ styles.logoTipo } src={ logo } alt="logo" />
        <p className={ styles.despesas }>
          <img src={ Vector } alt="Vector" />
          Total de despesas:
          <span data-testid="total-field">
            { sum.toFixed(2) }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
        <div className={ styles.displayEmail }>
          <img src={ vector } alt="vector" />
          <span className={ styles.email } data-testid="email-field">
            { email }
          </span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});
export default connect(mapStateToProps)(Header);
