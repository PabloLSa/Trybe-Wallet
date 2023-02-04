import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { cuRrencies } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    // this.createCurrencies();

    const { dispatch } = this.props;
    const curr = await this.createCurrencies();
    dispatch(cuRrencies(curr));
  }

  createCurrencies = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    return Object.keys(data);
  };

  render() {
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <input data-testid="value-input" type="number" />
        <input data-testid="description-input" type="text" />
        <select data-testid="currency-input">
          {
            currencies.map((currencie) => (
              <option value={ currencie } key={ currencie }>
                { currencie }
              </option>
            ))
          }

        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;
const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});
export default connect(mapStateToProps)(WalletForm);
