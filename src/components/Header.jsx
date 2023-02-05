import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div>
        <span data-testid="email-field">
          { email }
        </span>
        <span data-testid="total-field">
          { sum.toFixed(2) }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
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
