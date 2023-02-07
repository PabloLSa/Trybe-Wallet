import { ACTION_DELETE, ADD_EXPENSES, CURRENCIES,
  EDIT_EXPENSE, SAVE_EDITION_ACTION } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isEditing: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case ACTION_DELETE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
      idToEdit: action.editId,
    };
  case SAVE_EDITION_ACTION:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (Number(expense.id) === Number(state.idToEdit)) {
          return {
            ...expense,
            ...action.expenseEdited,
          };
        } return expense;
      }),
      isEditing: false,
    };
  default:
    return state;
  }
};
export default walletReducer;
