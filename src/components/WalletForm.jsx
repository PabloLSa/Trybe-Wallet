import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles/WalletForm.module.css';
import { addExpenses, cuRrencies, saveEditonAction } from '../redux/actions';

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

  componentDidUpdate(prevProp) {
    const { isEditing, idToEdit, expenses } = this.props;
    if (prevProp.idToEdit !== idToEdit && isEditing) {
      const expenseToEdit = expenses
        .find((expense) => Number(expense.id) === Number(idToEdit));
      this.setState({
        ...expenseToEdit,
      });
    }
  }

  createCurrencies = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    return data;
  };

  saveEditon = (state) => {
    const { idToEdit, dispatch } = this.props;
    const editExpense = {
      ...state,
      id: Number(idToEdit),
    };
    dispatch(saveEditonAction(editExpense));
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
    const { currencies, isEditing } = this.props;
    return (
      <div className={styles.formwallet}>
        <div className={styles.walletForm}>
          <label htmlFor="description" className={styles.label}>
            Descrição da despesa
            <input
              className={styles.input}
              data-testid="description-input"
              type="text"
              name="description"
              value={description}
              onChange={this.handleChange}
              id="description"
            />
          </label>
          <label
            htmlFor="tag"
            className={styles.label}
          >
            Categoria da despesa
            <select
              data-testid="tag-input"
              name="tag"
              onChange={this.handleChange}
              value={tag}
              id="tag"
              className={styles.input}
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label
            htmlFor="value"
            className={styles.label}
          >
            Valor
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={value}
              onChange={this.handleChange}
              id="value"
              className={styles.value}
            />
          </label>
          <label
            htmlFor="method"
            className={styles.label}
          >
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              onChange={this.handleChange}
              value={method}
              id="method"
              className={styles.input}
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label
            htmlFor="currency"
            className={styles.label}
          >
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={currency}
              onChange={this.handleChange}
              className={styles.input}
            >
              {
                // const coins = currencies.filter((e) => e.code !== 'USDT')
                currencies.map((currencie) => (
                  <option value={currencie} key={currencie}>
                    {currencie}
                  </option>
                ))
              }

            </select>
          </label>
        </div>
        <div className={styles.button}>
          <button
            className={styles.btt}
            onClick={() => {
              if (!isEditing) {
                this.saveExpense();
              } else {
                this.saveEditon(this.state);
              }
            }}
          >

            {

              isEditing ? 'Editar despesa' : 'Adicionar despesa'
            }
          </button>
        </div>
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
  expenses: globalState.wallet.expenses,
  isEditing: globalState.wallet.isEditing,
  idToEdit: globalState.wallet.idToEdit,
});
export default connect(mapStateToProps)(WalletForm);
