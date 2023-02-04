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
