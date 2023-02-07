// ACTIONS TYPES
// Coloque aqui suas actions
// ACTIONS CREATORS
export const ADD_EMAIL = 'ADD_EMAIL';
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const CURRENCIES = 'CURRENCIES';
export const cuRrencies = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const ADD_EXPENSES = 'ADD_EXPENSES';
export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const ACTION_DELETE = 'ACTION_DELETE';
export const actionDelete = (expenses) => ({
  type: ACTION_DELETE,
  expenses,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (editId) => ({
  type: EDIT_EXPENSE,
  editId,
});
export const SAVE_EDITION_ACTION = 'SAVE_EDITION_ACTION';

export const saveEditonAction = (expenseEdited) => ({
  type: SAVE_EDITION_ACTION,
  expenseEdited,
});
