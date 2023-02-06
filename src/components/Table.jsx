import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div>
        Table
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
            {/* Aqui você pode inserir as linhas da tabela com os dados */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
