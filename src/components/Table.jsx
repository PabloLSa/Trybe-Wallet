import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editar from '../img/Editar.png';
import excluir from '../img/excluir.png';
import { actionDelete, editExpense } from '../redux/actions';
import styles from './styles/Table.module.css';

class Table extends Component {
  expenseEdition = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(editExpense(target.id));
  };

  expenseDelete = ({ target }) => {
    const { dispatch, expenses } = this.props;
    const newExpenses = expenses.filter((expense) => Number(expense.id) !== Number(target
      .id));
    // console.log(newExpenses);
    dispatch(actionDelete(newExpenses));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>
                  {expense.exchangeRates[expense
                    .currency].name}

                </td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>
                  {
                    Number(expense.exchangeRates[expense
                      .currency].ask).toFixed(2)
                  }

                </td>
                <td>
                  {(Number(expense.value) * Number(expense
                    .exchangeRates[expense.currency].ask)).toFixed(2)}

                </td>
                <td>
                  REAL
                  <button
                    id={expense.id}
                    data-testid="edit-btn"
                    onClick={(event) => this.expenseEdition(event)}
                    className={styles.btt}
                  >
                    <img src={Editar} alt="Editar" />

                  </button>
                  <button
                    id={expense.id}
                    data-testid="delete-btn"
                    onClick={(event) => this.expenseDelete(event)}
                    className={styles.btt}
                  >
                    <img src={excluir} alt="Excluir" />

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
