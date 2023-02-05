import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, cuRrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: {},
  };

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
    return data;
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  saveExpense = async () => {
    const { dispatch } = this.props;
    const expenseValue = await this.createCurrencies();
    this.setState({
      exchangeRates: expenseValue,
    }, () => {
      dispatch(addExpenses(this.state));
      const { id } = this.state;
      this.setState({
        description: '',
        value: '',
        id: id + 1,
      });
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <input
          data-testid="value-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {
            currencies.map((currencie) => (
              <option value={ currencie } key={ currencie }>
                { currencie }
              </option>
            ))
          }

        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button onClick={ this.saveExpense }>
          Adicionar despesa
        </button>
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
